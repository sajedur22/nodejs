const http = require('http');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.originalname.split('.');
    const extension = filename.pop();
    cb(null, filename.join('.') + uniqueSuffix + '.' + extension);
  }
});

const upload = multer({ storage: storage });

const server = http.createServer((req, res) => {
  const url = req.url;

  switch (url) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('This is Home Page');
      break;
    case '/about':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('This is About Page');
      break;
    case '/contact':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('This is Contact Page');
      break;
    case '/file-write':
      fs.writeFile('demo.txt', 'hello world', (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error writing file');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('File created successfully');
        }
      });
      break;
    case '/upload':
      upload.single('file')(req, res, (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error uploading file');
        } else {
          const file = req.file;
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(`File uploaded successfully: ${file.originalname}`);
        }
      });
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
  }
});

server.listen(5500, () => {
  console.log('Server listening on port 5500');
});
