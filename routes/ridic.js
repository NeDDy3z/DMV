// Table - Řidič
// Dependencies
const express = require("express");
const multer = require('multer');
const router = express.Router();
const db = require('../database');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const tableName = 'ridic';
let searchData = [];



// Routing
// Default page
router.get('/', (req, res) => {
    let msg = req.query.msg ? req.query.msg : '';
    if (searchData.length > 0) {
        res.render('pages/'+tableName, { title: 'Řidiči', data: searchData, msg: '' });
        searchData = [];
    } else {
        select().then(results => {
            res.render('pages/'+tableName, { title: 'Řidiči', data: results, msg: msg });
        });
    }
});

// Search
router.post('/hledat', (req, res) => {
    const { jmeno, prijmeni, rod_cis, ztp, adresa } = req.body;
    select(jmeno, prijmeni, rod_cis, ztp, adresa).then(results => {
        searchData = results;
        res.status(200).redirect('/'+tableName);
    });
});

// Adding
router.post("/pridat", (req, res) => {
    const { jmeno, prijmeni, rod_cis, ztp, adresa } = req.body;

    if (jmeno, prijmeni, rod_cis, ztp, adresa) {
        let sql = 'INSERT INTO '+ tableName +' (jmeno, prijmeni, rod_cis, ztp, adresa) VALUES (?,?,?,?,?);';
        db.query(sql, [jmeno, prijmeni, rod_cis, ztp, adresa], (err, results) => {
            if (err) {
                console.error('DatabaseError - InsertOsoba:\n', err);
                res.status(500).redirect('/'+tableName+'?msg=Chyba při přidávání dat');
            }
            else res.status(200).redirect('/'+tableName+'?msg=Data přidána');
        });
    }
    else res.status(500).redirect('/'+tableName+'?msg=Chyba při vkládání dat na straně klienta');
});

// Adding from JSON
router.post("/pridat/json", upload.single('jsonfile'), (req, res) => {
    if (!req.file) return res.status(400).redirect('/'+tableName+'?msg=Chyba, soubor nebyl nahrán');

    const fileContent = req.file.buffer.toString('utf8');
    const sql = 'INSERT INTO '+ tableName +' (jmeno, prijmeni, rod_cis, ztp, adresa) VALUES (?,?,?,?,?);';
    
    try {
        const data = JSON.parse(fileContent);
        data.forEach(element => {
            if (element.jmeno && element.prijmeni && element.rod_cis && element.ztp && element.adresa) db.query(sql, [element.jmeno, element.prijmeni, element.rod_cis, element.ztp, element.adresa]);
        });
    } catch (error) {
        console.error('Error parsing JSON file:', error);
        res.status(500).redirect('/'+tableName+'?msg=Chyba při zpracování JSON souboru');
    }

    res.status(200).redirect('/'+tableName+'?msg=Data nahrána z JSON souboru');
});

// Editing
router.post("/upravit", (req, res) => {
    const { id, jmeno, prijmeni, rod_cis, ztp, adresa } = req.body;

    if (id, jmeno, prijmeni, rod_cis, ztp, adresa) {
        let sql = 'UPDATE '+ tableName +' SET jmeno = ?, prijmeni = ?, rod_cis = ?, ztp = ?, adresa = ? WHERE id_o = ?;';
    
        db.query(sql, [jmeno, prijmeni, rod_cis, ztp, adresa, id], (err, results) => {
            if (err) {
                console.error('DatabaseError - Insert '+tableName+':\n', err);
                res.status(500).redirect('/'+tableName+'?msg=Chyba při úpravě dat');
            }
            else res.status(200).redirect('/'+tableName+'?msg=Data upravena');
        });
    }    
});

// Deleting
router.post("/smazat", (req, res) => {
    let sql = 'DELETE FROM '+ tableName +' WHERE id_o = ?';

    db.query(sql, [req.body.id], (err, results) => {
        if (err) {
            console.error('DatabaseError - Delete '+tableName+':\n', err);
            res.status(500).redirect('/'+tableName+'?msg=Cyhba při mazání dat');
        }
        else res.status(200).redirect('/'+tableName+'?msg=Data smazána');
    });
});
  


// SQL functions
function select(jmeno, prijmeni, rod_cis, ztp, adresa) {
    let sql = 'SELECT * FROM ' + tableName;
    var data = { jmeno, prijmeni, rod_cis, ztp, adresa };
    var conditions = [];

    for (var key in data) {
        if (data[key])  conditions.push(key + " LIKE '%" + data[key] + "%'");
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' LIKE ');
    }

    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) {
                console.error('DatabaseError - Select '+tableName+':\n', err);
                reject(err);
            } else resolve(results);
        });
    });
};

module.exports = router;
