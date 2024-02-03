// Table - Úřad
const express = require("express");
const router = express.Router();
const db = require('../database');

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
    insert(nazev, adresa, typ);
    res.status(200).redirect('/urad?msg='+ msgName +' byl přidán.');
});

router.post("/upravit", (req, res) => {
    const { id, nazev, adresa, typ} = req.body;
    update(id, nazev, adresa, typ);
    res.status(200).redirect('/urad?msg='+ msgName +' byl upraven.');
});

router.post("/smazat", (req, res) => {
    remove(req.body.id);
    res.status(200).redirect('/urad?msg='+ msgName +' byl smazán.');
});
  


// SQL functions
function select(nazev, adresa, typ) {
    let sql = 'SELECT * FROM ' + tableName;
    var data = {nazev, adresa, typ};
    var conditions = [];

    for (var key in data) {
        if (data[key])  conditions.push(key + " = '" + data[key] + "'");
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
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

function insert(nazev, adresa, typ) {
    let sql = 'INSERT INTO '+ tableName +' (id_m, nazev, adresa, typ) VALUES (?,?,?,?);';

    db.query(sql, [1, nazev, adresa, typ], (err, results) => {
        if (err) console.error('DatabaseError - InsertUrad:\n', err);
    });
};

function update(id, nazev, adresa, typ) {
    let sql = 'UPDATE '+ tableName +' SET nazev = ?, adresa = ?, typ = ? WHERE id_u = ?;';
    
    db.query(sql, [nazev, adresa, typ, id], (err, results) => {
        if (err) console.error('DatabaseError - InsertUrad:\n', err);
    });
};

function remove(id) {
    let sql = 'DELETE FROM '+ tableName +' WHERE id_u = ?';

    db.query(sql, [id], (err, results) => {
        if (err) console.error('DatabaseError - DeleteUrad:\n', err);
    });
};

module.exports = router;
