const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('datenbank.db');

// Create a table
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS vorhanden (Frühlingsrollen INT, Frühlingsecken INT, Wantan INT, Muslitos INT, PhadThai INT, Tagesessen INT)');
  
    // Insert some sample data
    const stmt = db.prepare('INSERT INTO users VALUES (?, ?)');
    stmt.run(1,0,0,0,0,0);
    stmt.finalize();
  
    // Retrieve data and print it
    db.each('SELECT * FROM users', (err, row) => {
      console.log(`${row.id} - ${row.name}`);
    });
  });
  
  // Close the database connection
  db.close();