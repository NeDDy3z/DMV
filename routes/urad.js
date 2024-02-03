// Table - Úřad
const express = require("express");
const router = express.Router();
const db = require('../database');

const tableName = 'urad';
let searchData = [];



// Routing
router.get('/', (req, res, next) => {
    let msg = req.query.msg ? req.query.msg : '';
    if (searchData.length > 0) {
        res.render('pages/urad', { title: 'Úřady', data: searchData, msg: '' });
        searchData = [];
    } else {
        select().then(results => {
            res.render('pages/urad', { title: 'Úřady', data: results, msg: msg });
        });
    }
});

router.post('/hledat', (req, res, next) => {
    const { nazev, adresa, typ } = req.body;
    select(nazev, adresa, typ).then(results => {
        searchData = results;
        res.status(200).redirect('/urad');
    });
});

router.post("/pridat", (req, res) => {
    const { nazev, adresa, typ } = req.body;
    insert(nazev, adresa, typ);
    res.status(200).redirect('/urad?msg=Úřad byl přidán.');
});

router.post("/upravit", (req, res) => {
    const { nazev, adresa, typ } = req.body;
    update(nazev, nazev2, adresa, adresa2, typ, typ2);
});

router.post("/smazat", (req, res) => {
    remove(req.body.id);
    res.status(200).redirect('/urad?msg=Úřad byl smazán.');
});
  


// SQL functions
function select(nazev, adresa, typ) {
    let sql = 'SELECT * FROM '+ tableName;
    let data = [nazev, adresa, typ];
    for (var i = 0; i < data.length; i++) {
        if (data[i]) {
            sql += i === 0 ? ' WHERE' : ' AND';
            sql += data[i] ? ' ' + ['nazev', 'adresa', 'typ'][i] + " = '" + data[i] + "' ": '';
        }
    }
    sql += ';';

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

function update(nazev, nazev2, adresa, adresa2, typ, typ2) {
    let sql = 'INSERT INTO '+ tableName +' (id_m, nazev, adresa, typ) VALUES (?,?,?,?);';

    db.query(sql, [1, nazev, adresa, typ], (err, results) => {
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
