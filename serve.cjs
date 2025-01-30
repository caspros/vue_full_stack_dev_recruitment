const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3010;
const buildPath = path.join(__dirname, 'dist');

const server = http.createServer((req, res) => {
  let filePath = path.join(buildPath, req.url === '/' ? 'index.html' : req.url);
  
  // Extract the requested file's extension
  const extname = path.extname(filePath);
  
  // Set default content type
  let contentType = 'text/html';
  
  // Determine the content type based on the file extension
  switch (extname) {
    case '.js':
      contentType = 'application/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.svg':
      contentType = 'image/svg+xml';
      break;
    case '.ico':
      contentType = 'image/x-icon';
      break;
    default:
      contentType = 'text/html';
  }
  
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
  

  // Read the file from the file system
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == 'ENOENT') {
        // File not found, serve the index.html for client-side routing
        fs.readFile(path.join(buildPath, 'index.html'), (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        // Some server error
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      // Serve the file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
