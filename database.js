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
    "tchnickyprukaz" : "tchnickyprukaz (id_v, id_u, provozovatel, znacka, model, barva, spz, vin, vykon_kw, objem, nej_rychlost, rozmery_kol)",
    "vozidlo" : "vozidlo (id_tp)"
};
    


/*
function insert(table, data) {
    const query = 'INSERT INTO ' + insert_commands[table] +' VALUES (';
    for (var i = 0; i < data.length; i++) {
        query += data[i];
        if (i < data.length -1) query +=",";
    }
    query += ");"


  db.query(query, [name, email], (err, results) => {
    if (err) {
      console.error('Error adding data to the database:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('Data added to the database successfully');
    }
  });
};
*/

function insertOsoba(jmeno, prijmeni, rod_cis, ztp, adresa) {
    let sql = `INSERT INTO (jmeno, prijmeni, rod_cis, ztp, adresa) VALUES (${jmeno}, ${prijmeni}, ${rod_cis}, ${ztp}, ${adresa});`;
    // later
    db.query(sql, (err, results) => {
        if (err) {
          console.error('Error - InsertOsoba : ', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send('Success - InsertOsoba');
        }
      });
};

function selectOsoba() {
    
}

