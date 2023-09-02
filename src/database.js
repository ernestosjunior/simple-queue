let sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the sample database.");
    db.run(
      "CREATE TABLE db ( \
          id INTEGER PRIMARY KEY AUTOINCREMENT,\
          total integer \
          )",
      (err) => {
        if (err) {
          console.log("Table already exists.");
        }else{
          let insert = 'INSERT INTO db (total) VALUES (?)';
          db.run(insert, [10000]);
        }
      }
    );
  }
});

module.exports = db;
