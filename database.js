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
  })

const insert_commands = {
    "urad" : "urad (nazev, adresa, typ)",
    "osoba" :"osoba (jmeno, prijmeni, rod_cis, ztp, adresa)",
    "ridicskeopravneni" : "ridicskeopravneni (typ, max_hmotnost)",
    "ridicskyprukaz" : "ridicskyprukaz (id_o, id_u, id_ro, dat_zacatku, dat_konce)",
    "vozidlo" : "vozidlo (id_tp)",
    "tchnickyprukaz" : "tchnickyprukaz (id_v, id_u, provozovatel, znacka, model, barva, spz, vin, vykon_kw, objem, nej_rychlost, rozmery_kol)"
};
    



//
// SQL REQUESTS
//

// ÚŘAD
function insertUrad(nazev, adresa, typ) {
    let sql = `INSERT INTO urad (nazev, adresa, typ) VALUES (${nazev}, ${adresa}, ${typ});`;

    db.query(sql, (err, results) => {
        if (err) {
          console.error('Error - InsertOsoba : ', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send('Success - InsertOsoba');
        }
    });
};

function selectUrad(searchCollection) {
    let sql = 'SELECT * FROM urad';

    if (searchCollection.length > 0) sql += ' WHERE ';
    for (var i = 0; i < searchCollection.length; i++) {
        sql += i=0 ? 'nazev = ' : i=1 ? 'adresa = ' : 'typ = '
        sql += `'${searchCollection[i]}'`;
    };

};



// OSOBA
function insertOsoba(jmeno, prijmeni, rod_cis, ztp, adresa) {
    let sql = `INSERT INTO osoba (jmeno, prijmeni, rod_cis, ztp, adresa) VALUES (${jmeno}, ${prijmeni}, ${rod_cis}, ${ztp}, ${adresa});`;

    db.query(sql, (err, results) => {
        if (err) {
          console.error('Error - InsertOsoba : ', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send('Success - InsertOsoba');
        }
    });
};

function selectOsoba(jmeno, prijmeni, rod_cis, ztp, adresa) {
    
};



// ŘIDIČSKÝ PRŮKAZ



// ŘIDIČSKÉ OPRÁVNĚNÍ



// VOZIDLO



// TECHNICKÝ PRŮKAZ
