const http = require('http');
const fs = require("fs");
const express = require("express");

const hostname = '127.0.0.1'; // localhost
const port = 3000;
const app = express();

app.use(express.json());
app.use(express.static("Frontend"));

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/HTML');
  //response.setHeader('Access-Control-Allow-Origin', '*'); // on CORS error
  const url = new URL(request.url || '', `http://${request.headers.host}`);
  switch (url.pathname) {
    case '/Bestellseite':
      html = fs.readFileSync("./Index.html")
      response.write(html);
      break;
    case '/Aufnehmeseite':
      response.write('Hier ist was du suchst: ' + url.searchParams.get('item'));
      break;
    case '/Kuechenseite':
      response.write('Kochen und so');
      break;
    case '/Style':
      response.writeHeader('Content-Type', 'text/css');
      css = fs.readFileSync("./Style.css")
      response.end(css);
      break;
    default:
      response.statusCode = 404;
  }
  response.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});