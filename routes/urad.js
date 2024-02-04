// Table - Úřad
// Dependencies
const express = require("express");
const multer = require('multer');
const router = express.Router();
const db = require('../database');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const tableName = 'urad';
let searchData = [];



// Routing
// Default page
router.get('/', (req, res) => {
    try {
        let msg = req.query.msg ? req.query.msg : '';
        if (searchData.length > 0) {
            res.render('pages/'+tableName, { title: 'Úřady', data: searchData, msg: '' });
            searchData = [];
        } else {
            select().then(results => {
                res.render('pages/'+tableName, { title: 'Úřady', data: results, msg: msg });
            });
        }
    } catch (error) {
        console.error('Error rendering '+tableName+':', error);
        res.status(500).redirect('/');
    }
});

// Search
router.post('/hledat', (req, res) => {
    try {
        const { nazev, adresa, typ } = req.body;
        select(nazev, adresa, typ).then(results => {
            searchData = results;
            res.status(200).redirect('/'+tableName+'');
        });
    } catch (error) {
        console.error('Error searching '+tableName+':', error);
        res.status(500).redirect('/'+tableName+'?msg=Chyba při vyhledávání dat');
    }
});

// Adding
router.post("/pridat", (req, res) => {
    try {
        const { nazev, adresa, typ } = req.body;

        if (nazev && adresa && typ) {
            let sql = 'INSERT INTO '+ tableName +' (id_m, nazev, adresa, typ) VALUES (?,?,?,?);';
            db.query(sql, [1, nazev, adresa, typ], (err, results) => {
                if (err) {
                    console.error('DatabaseError - Insert '+tableName+':\n', err);
                    res.status(500).redirect('/'+tableName+'?msg=Chyba při přidávání dat');
                }
                else res.status(200).redirect('/'+tableName+'?msg=Data přidána');
            });
        }
        else res.status(500).redirect('/'+tableName+'?msg=Chyba při vkládání dat na straně klienta');
    } catch (error) {
        console.error('Error adding '+tableName+':', error);
        res.status(500).redirect('/'+tableName+'?msg=Chyba při vkládání dat na straně klienta');
    }
});

// Adding from JSON
router.post("/pridat/json", upload.single('jsonfile'), (req, res) => {
    try {
    if (!req.file) return res.status(400).redirect('/'+tableName+'?msg=Chyba, soubor nebyl nahrán');

    const fileContent = req.file.buffer.toString('utf8');
    const sql = 'INSERT INTO '+ tableName +' (id_m, nazev, adresa, typ) VALUES (?,?,?,?);';
        const data = JSON.parse(fileContent);

        data.forEach(element => {
            if (element.nazev && element.adresa && element.typ) db.query(sql, [1, element.nazev, element.adresa, element.typ]);
        });

        res.status(200).redirect('/'+tableName+'?msg=Data nahrána z JSON souboru');
    } catch (error) {
        console.error('Error parsing JSON file:', error);
        res.status(500).redirect('/'+tableName+'?msg=Chyba při zpracování JSON souboru');
    }
});

// Editing
router.post("/upravit", (req, res) => {
    try {
        const { id, nazev, adresa, typ } = req.body;

        if (id, nazev, adresa, typ) {
            let sql = 'UPDATE '+ tableName +' SET nazev = ?, adresa = ?, typ = ? WHERE id_u = ?;';
        
            db.query(sql, [nazev, adresa, typ, id], (err, results) => {
                if (err) {
                    console.error('DatabaseError - Insert '+tableName+':\n', err);
                    res.status(500).redirect('/'+tableName+'?msg=Chyba při úpravě dat');
                }
                else res.status(200).redirect('/'+tableName+'?msg=Data upravena');
            });
        }  
    } catch (error) {
        console.error('Error editing '+tableName+':', error);
        res.status(500).redirect('/'+tableName+'?msg=Chyba při úpravě dat');
    }
});

// Deleting
router.post("/smazat", (req, res) => {
    try {
        let sql = 'DELETE FROM '+ tableName +' WHERE id_u = ?';

        db.query(sql, [req.body.id], (err, results) => {
            if (err) {
                console.error('DatabaseError - DeleteUrad:\n', err);
                res.status(500).redirect('/'+tableName+'?msg=Cyhba při mazání dat');
            }
            else res.status(200).redirect('/'+tableName+'?msg=Data smazána');
        });
    } catch (error) {
        console.error('Error deleting '+tableName+':', error);
        res.status(500).redirect('/'+tableName+'?msg=Chyba při mazání dat');
    }
});
  


// SQL functions
function select(nazev, adresa, typ) {
    try {
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
                    console.error('DatabaseError - Select '+tableName+':\n', err);
                    reject(err);
                } else resolve(results);
            });
        });
    } catch (error) {
        console.error('Error selecting '+tableName+':', error);
    }
};

module.exports = router;
