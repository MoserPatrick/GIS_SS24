const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('datenbank.db');
const {v4:uuidv4} = require("uuid");
//const stmt = "";

const hostname = '127.0.0.1'; // localhost
const port = 3000;


const server = http.createServer(async(request, response) => {
 
  const method = request.method;
  response.statusCode = 200;
  let jsonString = '';
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', '*'); // on CORS error
  const url = new URL(request.url || '', `http://${request.headers.host}`);
  
  
 // console.log(id); // Extrahiere die ID aus der URL
  // Es fehlen noch Delete responses
  switch (url.pathname) {
    case '/Bestellungen':
      if(method === "POST"){
        jsonString = '';
        request.on('data', (data) => {
          jsonString += data;
        });
        request.on('end', () => {
          const obj = JSON.parse(jsonString);
          const uniqueId = uuidv4();
          db.run("INSERT INTO Auswahl VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [uniqueId, obj.Art, obj.Frühlingsrollen, obj.Frühlingsecken, obj.Wantan, obj.Muslitos, obj.PhadThai, obj.Tagesessen]);
          response.end();
        });
        }
      else if(method === "DELETE"){
        const id = url.searchParams.get("id");
        console.log("url " + url);
        console.log("id " + id);
          // delete one spezific with id 
          console.log("DELETING");
        db.run("DELETE FROM Auswahl WHERE id = ?", [id]);
        response.end();
        //stmt = db.prepare("DELETE FROM Auswahl WHERE column = ?" );
      } 
      else{ // wenn GET
        const id = url.searchParams.get("id");
        console.log("url " + url);
        console.log("id " + id);
        console.log("GETTTTING");
        response.writeHeader(200,{'Content-Type': 'application/json'});
        db.get('SELECT * FROM Auswahl WHERE id = ?',[id], async (err, row) => {
          const obj = await row; // brauch ich hier await? es ging ohne
          jsonString = JSON.stringify(obj)
          console.log(jsonString );
          response.write(jsonString);
          response.end();
        })
      }
      
      
      break;
      case '/GetBestellungen':
        //response.write(JSON.stringify(db.get('SELECT * FROM Auswahl WHERE Art = ?', ["Bestellung"]))); 
        db.all('SELECT * FROM Auswahl WHERE Art = ?', ["Bestellung"], (err, row) => {
          response.write(JSON.stringify(row));
          response.end();
        })
      break;
 
  
    case '/Bearbeitungen':
      if(method === "POST"){
        jsonString = '';
        request.on('data', (data) => {
          jsonString += data;
          console.log("Data: "+ data);
        });
        
        request.on('end', () => {
          console.log("Daten: "+ jsonString);
          const obj = JSON.parse(jsonString);
          const uniqueId = uuidv4();
          db.run("INSERT INTO Bearbeitung VALUES (?, ?, ?)", [uniqueId, obj.was, obj.wieviel]);
          response.end();
        });
      }
      else if(method === "DELETE"){
        const id = url.searchParams.get("id");
        console.log("url " + url);
        console.log("id " + id);
        // delete one spezific with id 
        db.run("DELETE FROM Bearbeitung WHERE id = ?", [id]);
        response.end();
      }
      else{// wenn GET 
        const id = url.searchParams.get("id");
        console.log("url " + url);
        console.log("id " + id);
          response.writeHeader(200,{'Content-Type': 'application/json'});
          db.get('SELECT * FROM Bearbeitung WHERE id = ?',[id], async (err, row) => {
            const obj = await row; // brauch ich hier await? es ging ohne
            jsonString = JSON.stringify(obj)
            console.log(jsonString );
            response.write(jsonString);
            response.end();
          })
      }

      break;

      case '/GetBearbeitungen':
        //response.write(JSON.stringify(db.get('SELECT * FROM Bearbeitung WHERE Art = ?', ["Bearbeitung"]))); 
          db.all('SELECT * FROM Bearbeitung ', (err, row) => {
          response.write(JSON.stringify(row));
          response.end();
        })
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
      console.log("Enter Patch");
      if(method === "PATCH"){
        jsonString = '';
        console.log("yes PATCH");
        request.on('data', (data) => {
          jsonString += data;
          console.log(jsonString);
        });
        request.on('end', () => {
          const obj = JSON.parse(jsonString);
          console.log("Updated: "+ jsonString);
          //console.log(obj);
          //db.run("UPDATE Auswahl SET ?,?,?,?,?,?,?,? WHERE Art = ?", [obj.id, obj.Art, obj.Frühlingsrollen, obj.Frühlingsecken, obj.Wantan, obj.Muslitos, obj.PhadThai,obj.Tagesessen, "Ausstehend"]);
          db.run("UPDATE Auswahl SET ? WHERE Art = ?", [obj,"Ausstehend"]);
          console.log("CLOSE Patch");
          response.end();
        });
        
      }
      else {// wenn GET
        console.log("Enter Get");
        response.writeHeader(200,{'Content-Type': 'application/json'});
        db.get('SELECT * FROM Auswahl WHERE Art = ?',["Ausstehend"], async (err, row) => {
          const obj = await row; // brauch ich hier await? es ging ohne
          jsonString = JSON.stringify(obj)
          console.log(jsonString );
          response.write(jsonString);
          console.log("CLOSE GET");
          response.end();
      });
      }
       
        break;
  
        case '/Vorhanden':
          if(method === "PATCH"){
            jsonString = '';
            request.on('data', (data) => {
              jsonString += data;
            });
            request.on('end', () => {
              const obj = JSON.parse(jsonString);
              db.run("UPDATE Auswahl SET ? WHERE Art = ?", [obj,"Vorhanden"]);
              response.end();
            });
          }
        else{// wenn GET
          console.log("GET-Vorhanden anfang");

          response.writeHeader(200,{'Content-Type': 'application/json'});
          /*const obj = await db.get('SELECT * FROM Auswahl WHERE Art = ?', ["Vorhanden"],)
          .then(jsonString = JSON.stringify(obj))
          .then(response.write(jsonString))
          .then( console.log(jsonString));
          console.log("GET-Vorhanden ende");*/
          //response.write(jsonString);
          db.get('SELECT * FROM Auswahl WHERE Art = ?',["Vorhanden"], async (err, row) => {
              const obj = await row; // brauch ich hier await? es ging ohne
              jsonString = JSON.stringify(obj)
              console.log(jsonString );
              response.write(jsonString);
              response.end();
          });
          //console.log(await db.get("SELECT * FROM Auswahl WHERE Art = ?", ["Vorhanden"]));
        }
          
        break;
  
    default:
      response.statusCode = 404;
  }
  console.log("Ende");

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});