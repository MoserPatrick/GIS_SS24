const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('datenbank.db');

// Create a table
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS Auswahl (Art TEXT, Frühlingsrollen INT, Frühlingsecken INT, Wantan INT, Muslitos INT, PhadThai INT, Tagesessen INT)');
    db.run('CREATE TABLE IF NOT EXISTS Bearbeitung (Was TEXT, Wieviel INT)');
  
    // Insert some sample data
    const stmt = db.prepare('INSERT INTO Auswahl VALUES (?, ?, ?, ?, ?, ?, ?)');
    stmt.run("Anstehend",0,0,0,0,0,0);
    stmt.run("Vorhanden",0,0,0,0,0,0);
    stmt.finalize();

    /*const stamt = db.prepare('INSERT INTO Bearbeitung VALUES (?, ?)');
    stamt.finalize();*/
  
    // Retrieve data and print it
    db.each('SELECT * FROM Auswahl', (err, row) => {
      console.log(`${row.id} - ${row.name}`);
    });
  });
  
  // Close the database connection
  db.close();