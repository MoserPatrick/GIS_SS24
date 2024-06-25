const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('datenbank.db');

// Create a table
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS Auswahl (Art TEXT, Frühlingsrollen INT, Frühlingsecken INT, Wantan INT, Muslitos INT, PhadThai INT, Tagesessen INT)');
    db.run('CREATE TABLE IF NOT EXISTS Bearbeitung (Was TEXT, Wieviel INT)');
  
    // Insert some sample data
    const stmt = db.prepare('INSERT INTO Auswahl VALUES (?, ?, ?, ?, ?, ?, ?)');
    stmt.run("Ausstehend",0,0,0,0,0,0);
    stmt.run("Vorhanden",0,0,0,0,0,0);
    stmt.finalize();

    /*const stamt = db.prepare('INSERT INTO Bearbeitung VALUES (?, ?)');
    stamt.finalize();*/
  
    // Retrieve data and print it
    db.get('SELECT * FROM Auswahl WHERE Art = ?',["Vorhanden"], (err, row) => {
      console.log(`${JSON.stringify(row)} - ${row.Art} - ${row.id}`);
    });
   /* const row = db.get('SELECT * FROM Auswahl WHERE Art = ?',["Vorhanden"]);
    console.log(`${JSON.stringify(row)}`);*/
  });
  
  // Close the database connection
  db.close();