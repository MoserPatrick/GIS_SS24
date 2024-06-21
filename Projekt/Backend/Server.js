const http = require('http');
const fs = require("fs");
method = request.method;

const hostname = '127.0.0.1'; // localhost
const port = 3000;


const server = http.createServer((request, response) => {
  response.statusCode = 200;
  let jsonString = 'Bestellung';
  response.setHeader('Content-Type', 'text/JSON');
  response.setHeader('Access-Control-Allow-Origin', '*'); // on CORS error
  const url = new URL(request.url || '', `http://${request.headers.host}`);
  // Es fehlen noch Delete responses
  switch (url.pathname) {
    case '/Bestellungen':
      html = fs.readFileSync("./Index.html")
      response.write(html);
      break;
    
    case '/Bestellung':
      // give one spezific with id 
      html = fs.readFileSync("./Index.html")
      response.write(html);
      break; 

    case method === "POST" && '/Bestellungen':
      jsonString = '';
      request.on('data', (data) => {
        jsonString += data;
      });
      request.on('end', () => {
        console.log(JSON.parse(jsonString));
      });
      break;

    case '/Bearbeitung':
      response.write('Kochen und so');
      break;

    case  method === "POST" && '/Bearbeitung':
      jsonString = '';
      request.on('data', (data) => {
        jsonString += data;
      });
      request.on('end', () => {
        console.log(JSON.parse(jsonString));
      });
      break;

      case '/Ausstehend':
        response.write('Kochen und so');
        break;
  
      case  method === "PATCH" && '/Ausstehend':
        jsonString = '';
        request.on('data', (data) => {
          jsonString += data;
        });
        request.on('end', () => {
          console.log(JSON.parse(jsonString));
        });
        break;

        case '/Vorhanden':
        response.write('Kochen und so');
        break;
  
      case  method === "PATCH" && '/Vorhanden':
        jsonString = 'Vorhanden';
        request.on('data', (data) => {
          jsonString += data;
        });
        request.on('end', () => {
          console.log(JSON.parse(jsonString));
        });
        break;
    default:
      response.statusCode = 404;
  }
  response.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});