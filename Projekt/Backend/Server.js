const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('datenbank.db');

const stmt = "";

const hostname = '127.0.0.1'; // localhost
const port = 3000;


const server = http.createServer((request, response) => {
  const method = request.method;
  response.statusCode = 200;
  let jsonString = '';
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', '*'); // on CORS error
  const url = new URL(request.url || '', `http://${request.headers.host}`);
  const id = url.pathname.split('/')[2];
 // console.log(id); // Extrahiere die ID aus der URL
  // Es fehlen noch Delete responses
  switch (url.pathname) {
    case '/Bestellungen/':
      if(method === "POST"){
        jsonString = '';
        request.on('end', (data) => {
          jsonString += data;
          const obj = JSON.parse(jsonString);
          db.run("INSERT INTO Auswahl VALUES (?, ?, ?, ?, ?, ?, ?)", [obj.Art, obj.Frühlingsrollen, obj.Frühlingsecken, obj.Wantan, obj.Muslitos, obj.PhadThai, obj.Tagesessen]);
        });
        }
      else if(method === "DELETE"){
          // delete one spezific with id 
        db.run("DELETE FROM Auswahl WHERE id = ?", [id]);
        //stmt = db.prepare("DELETE FROM Auswahl WHERE column = ?" );
      } 
      else{
        response.write(JSON.stringify(db.get('Select * FROM Auswahl WHERE id = ?', [id]))); 
      }
      
      
      break;
 
  
    case '/Bearbeitungen':
    
      if(method === "POST"){
        jsonString = '';
      request.on('end', (data) => {
        jsonString += data;
        obj = JSON.parse(jsonString);
        db.run("INSERT INTO Auswahl VALUES (?, ?)", [obj.Was, obj.Wieviel]);
      });
      }
      else if(method === "DELETE"){
        // delete one spezific with id 
        db.run("DELETE FROM Auswahl WHERE id = ?", [id]);
      }
      else{
        response.write(JSON.stringify(db.get('Select * FROM Auswahl WHERE id = ?', [id]))); 
      }

      break;
    
    /*case '/Bearbeitung':
      // give one spezific with id 
      number = "data";
      request.on('data', (data) => {
      number += data;
      });
      response.write(db.get("Select columns FROM Auswahl WHERE id = number"));

      break;*/

      case '/Ausstehend':

      if(method === "PATCH"){
        jsonString = '';
        request.on('end', (data) => {
          jsonString += data;
          db.run("UPDATE Auswahl SET ? WHERE Art = ?", [jsonString,"Ausstehend"]);
        });
        
      }
      else{
        response.write(JSON.stringify(db.get("Select * FROM Auswahl WHERE Art = ?"), ["Ausstehend"]));
      }
       
        break;
  
        case '/Vorhanden':
        if(method === "PATCH"){
          jsonString = '';
          request.on('end', (data) => {
            jsonString += data;
            db.run("UPDATE Auswahl SET ? WHERE Art = ?"), [jsonString,"Vorhanden"];
          });
        }
        else{
          response.write(db.get("Select * FROM Auswahl WHERE Art = ?", ["Vorhanden"]));
          console.log("GET-Vorhanden");
          console.log(db.get("Select * FROM Auswahl WHERE Art = ?", [Vorhanden]));
          console.log(JSON.stringify(db.get("Select * FROM Auswahl WHERE Art = ?", [Vorhanden])));
        }
          
        break;
  
    default:
      response.statusCode = 404;
  }
  console.log("Ende");
  response.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});