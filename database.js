const mysql = require('mysql');

// Database Connection
const db = mysql.createConnection({

  host : 'localhost',
  user : 'node',
  password : 'node',
    database : 'ministerstvodopravy'
});
  
db.connect((err) => {
  if(err){
    throw err;
  }
  console.log('MySQL connected');
});



//
// SQL REQUESTS
//

// Urad
function insertUrad(nazev, adresa, typ) {
    let sql = 'INSERT INTO urad (nazev, adresa, typ) VALUES (?,?,?);';

    db.query(sql, [nazev, adresa, typ],(err, results) => {
        if (err) {
          console.error('DatabaseError - InsertUrad: ', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send('Success - InsertOsoba');
        }
    });
};

function selectUrad(nazev, adresa, typ) {
    let sql = 'SELECT * FROM urad';


};



// Osoba
function insertOsoba(jmeno, prijmeni, rod_cis, ztp, adresa) {
    let sql = 'INSERT INTO osoba (jmeno, prijmeni, rod_cis, ztp, adresa) VALUES (?, ?, ?, ?, ?);';

    db.query(sql, [jmeno, prijmeni, rod_cis, ztp, adresa], (err, results) => {
        if (err) {
          console.error('DatabaseError  - InsertOsoba: ', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send('Success - InsertOsoba');
        }
    });
};

function selectOsoba(jmeno, prijmeni, rod_cis, ztp, adresa) {
  let sql = 'SELECT * FROM osoba';

};



// Řidičský průkaz



// Řidičské oprávnění



// Vozidlo



// Technický průkaz



//
// Export
//
module.exports = {
  insertUrad,
  selectUrad
};