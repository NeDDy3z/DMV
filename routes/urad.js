// Table - Úřad
const express = require("express");
const multer = require('multer');
const router = express.Router();
const db = require('../database');

const storage = multer.memoryStorage(); // Using memory storage for simplicity, adjust as needed
const upload = multer({ storage: storage });

const msgName = 'Úřad';
const tableName = 'urad';
let searchData = [];



// Routing
router.get('/', (req, res) => {
    let msg = req.query.msg ? req.query.msg : '';
    if (searchData.length > 0) {
        res.render('pages/urad', { title: 'Úřady', data: searchData, msg: '' });
    } else {
        select().then(results => {
            res.render('pages/urad', { title: 'Úřady', data: results, msg: msg });
        });
    }
});

router.post('/hledat', (req, res) => {
    const { nazev, adresa, typ } = req.body;
    select(nazev, adresa, typ).then(results => {
        searchData = results;
        res.status(200).redirect('/urad');
    });
});

router.post("/pridat", (req, res) => {
    const { nazev, adresa, typ } = req.body;

    if (nazev && adresa && typ) {
        let sql = 'INSERT INTO '+ tableName +' (id_m, nazev, adresa, typ) VALUES (?,?,?,?);';
        db.query(sql, [1, nazev, adresa, typ], (err, results) => {
            if (err) {
                console.error('DatabaseError - InsertUrad:\n', err);
                res.status(500).redirect('/urad?msg=Data nebyla přidána');
            }
            else res.status(200).redirect('/urad?msg=Data přidána');
        });
    }
    else res.status(500).redirect('/urad?msg=Chyba při vkládání dat na straně klienta');
});

router.post("/pridat/json", upload.single('jsonfile'), (req, res) => {
    if (!req.file) return res.status(400).send('Soubor nebyl nahrán');

    const fileContent = req.file.buffer.toString('utf8');
    const sql = 'INSERT INTO '+ tableName +' (id_m, nazev, adresa, typ) VALUES (?,?,?,?);';
    
    try {
        const data = JSON.parse(fileContent);

        data.forEach(element => {
            db.query(sql, [1, element.nazev, element.adresa, element.typ]);
        });

        res.status(200).redirect('/urad?msg=Data byla nahrána z JSON souboru');
    } catch (error) {
        console.error('Error parsing JSON file:', error);
        res.status(500).redirect('/urad?msg=Chyba při zpracování JSON souboru');
    }
});

router.post("/upravit", (req, res) => {
    const { id, nazev, adresa, typ } = req.body;

    if (id, nazev, adresa, typ) {
        let sql = 'UPDATE '+ tableName +' SET nazev = ?, adresa = ?, typ = ? WHERE id_u = ?;';
    
        db.query(sql, [nazev, adresa, typ, id], (err, results) => {
            if (err) {
                console.error('DatabaseError - InsertUrad:\n', err);
                res.status(500).redirect('/urad?msg=Data nebyla upravena');
            }
            else res.status(200).redirect('/urad?msg=Data upravena');
        });
    }    
});

router.post("/smazat", (req, res) => {
    let sql = 'DELETE FROM '+ tableName +' WHERE id_u = ?';

    db.query(sql, [req.body.id], (err, results) => {
        if (err) {
            console.error('DatabaseError - DeleteUrad:\n', err);
            res.status(500).redirect('/urad?msg=Cyhba při mazání dat');
        }
        else res.status(200).redirect('/urad?msg='+ msgName +' byl smazán');
    });
});
  


// SQL functions
function select(nazev, adresa, typ) {
    let sql = 'SELECT * FROM ' + tableName;
    var data = {nazev, adresa, typ};
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
                console.error('DatabaseError - SelectUrad:\n', err);
                reject(err);
            } else resolve(results);
        });
    });
};

module.exports = router;
