const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8080;
const DATA_DIR = path.join(__dirname, 'data');
const CHITS_FILE = path.join(DATA_DIR, 'chits.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(CHITS_FILE)) {
  fs.writeFileSync(CHITS_FILE, '[]', 'utf8');
}
if (!fs.existsSync(CONFIG_FILE)) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify({ masterSheetId: '', sheets: {} }, null, 2), 'utf8');
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.txt': 'text/plain'
};

function readJsonFile(filePath, fallback = []) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e);
  }
  return fallback;
}

function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error(`Error writing ${filePath}:`, e);
    return false;
  }
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API ROUTES
  // 1. GET /api/chits
  if (pathname === '/api/chits' && req.method === 'GET') {
    const chits = readJsonFile(CHITS_FILE, []);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(chits));
    return;
  }

  // 2. POST /api/chits
  if (pathname === '/api/chits' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const item = JSON.parse(body || '{}');
        const chits = readJsonFile(CHITS_FILE, []);
        const newRecord = {
          id: item.id || `SUB-${Date.now().toString().slice(-6)}`,
          time: item.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          committee: item.committee || 'unga',
          type: item.type || 'Substantive Chit',
          from: item.from || 'Anonymous',
          to: item.to || 'Executive Board',
          content: item.content || '',
          status: 'Verified',
          createdAt: new Date().toISOString()
        };
        chits.unshift(newRecord);
        writeJsonFile(CHITS_FILE, chits);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, chit: newRecord, total: chits.length }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }
    });
    return;
  }

  // 3. GET /api/sheets-config
  if (pathname === '/api/sheets-config' && req.method === 'GET') {
    const config = readJsonFile(CONFIG_FILE, { masterSheetId: '', sheets: {} });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(config));
    return;
  }

  // 4. POST /api/sheets-config
  if (pathname === '/api/sheets-config' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const config = JSON.parse(body || '{}');
        writeJsonFile(CONFIG_FILE, config);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, config }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid config' }));
      }
    });
    return;
  }

  // 5. Proxy Google Sheet gviz endpoint to avoid CORS issues
  if (pathname === '/api/proxy-sheet' && req.method === 'GET') {
    const sheetId = parsedUrl.query.id;
    const sheetName = parsedUrl.query.sheet;
    if (!sheetId) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing sheet id parameter' }));
      return;
    }
    const targetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json` + (sheetName ? `&sheet=${encodeURIComponent(sheetName)}` : '');
    https.get(targetUrl, targetRes => {
      let data = '';
      targetRes.on('data', chunk => data += chunk);
      targetRes.on('end', () => {
        res.writeHead(targetRes.statusCode || 200, { 'Content-Type': 'application/json' });
        res.end(data);
      });
    }).on('error', err => {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    });
    return;
  }

  // STATIC FILE SERVING
  let safePath = pathname === '/' ? 'home.html' : pathname;
  let filePath = path.join(__dirname, decodeURIComponent(safePath));

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'home.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h2>404 Not Found</h2><p><a href="/home.html">Return to GTMUN Home</a></p>');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`GTMUN'26 Delegate Portal live at http://localhost:${PORT}/`);
});
