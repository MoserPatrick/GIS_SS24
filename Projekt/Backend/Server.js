const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('datenbank.db');

const stmt = "";

const hostname = '127.0.0.1'; // localhost
const port = 3000;


const server = http.createServer((request, response) => {
  const method = request.method;
  response.statusCode = 200;
  let jsonString = 'Bestellung';
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', '*'); // on CORS error
  const url = new URL(request.url || '', `http://${request.headers.host}`);
  const id = url.pathname.split('/')[2];
  console.log(id); // Extrahiere die ID aus der URL
  // Es fehlen noch Delete responses
  switch (url.pathname) {
    case '/Bestellungen/':
      response.write(JSON.stringify(db.get('Select * FROM Auswahl WHERE id = ?', [id]))); 
      
      break;
 
    case  method === "DELETE" && '/Bestellungen':
      // delete one spezific with id 
      db.run("DELETE FROM Auswahl WHERE id = ?", [id]);
      //stmt = db.prepare("DELETE FROM Auswahl WHERE column = ?" );
      break; 

    case method === "POST" && '/Bestellungen':
      jsonString = '';
      request.on('data', (data) => {
        jsonString += data;
      });
      obj = JSON.parse(jsonString);
      db.run("INSERT INTO Auswahl VALUES (?, ?, ?, ?, ?, ?, ?)", [obj.Art, obj.Frühlingsrollen, obj.Frühlingsecken, obj.Wantan, obj.Muslitos, obj.PhadThai, obj.Tagesessen]);
    
      request.on('end', () => {
        console.log(obj);
        console.log(jsonString);
      });
      break;

    case '/Bearbeitungen':
      
    response.write(JSON.stringify(db.get('Select * FROM Auswahl WHERE id = ?', [id]))); 
      break;
    
    /*case '/Bearbeitung':
      // give one spezific with id 
      number = "data";
      request.on('data', (data) => {
      number += data;
      });
      response.write(db.get("Select columns FROM Auswahl WHERE id = number"));

      break;*/

    case  method === "POST" && '/Bearbeitungen':
      jsonString = '';
      request.on('data', (data) => {
        jsonString += data;
      });
      obj = JSON.parse(jsonString);
      db.run("INSERT INTO Auswahl VALUES (?, ?)", [obj.Was, obj.Wieviel]);
    
      request.on('end', () => {
        console.log(obj);
        console.log(jsonString);
      });
      break;

      case  method === "DELETE" && '/Bearbeitungen':
      // delete one spezific with id 
      db.run("DELETE FROM Auswahl WHERE id = ?", [id]);
      break; 

      case '/Ausstehend':
      
        response.write(JSON.stringify(db.get("Select * FROM Auswahl WHERE Art = ?"), ["Ausstehend"]));

        break;
  
      case  method === "PATCH" && '/Ausstehend':
        jsonString = '';
        request.on('data', (data) => {
          jsonString += data;
        });
        db.run("UPDATE Auswahl SET jsonString WHERE Art = ?", ["Ausstehend"])
        request.on('end', () => {
          console.log(JSON.parse(jsonString));
        });
        break;

        case '/Vorhanden':
        
          response.write(JSON.stringify(db.get("Select * FROM Auswahl WHERE Art = ?", ["Vorhanden"])));

        break;
  
      case  method === "PATCH" && '/Vorhanden':
        jsonString = '';
        request.on('data', (data) => {
          jsonString += data;
        });

        db.run("UPDATE Auswahl SET jsonString WHERE Art = ?"), ["Vorhanden"];
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