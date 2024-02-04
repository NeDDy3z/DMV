// Table - Vozidlo/Technický průkaz
// Dependencies
const express = require("express");
const multer = require('multer');
const router = express.Router();
const db = require('../database');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const sqlName = 'technickyprukaz';
const dirName = 'vozidlo';
let searchData = [];



// Routing
// Default page
router.get('/', (req, res) => {
    try {
        let msg = req.query.msg ? req.query.msg : '';
        db.query('SELECT * FROM urad;', (err, urad) => {
            if (searchData.length > 0) {
                res.render('pages/'+dirName, { title: 'Vozidla', technickyprukaz: searchData, urad: urad, msg: msg });
                searchData = [];
            }
            else {
                select().then(results => {
                    res.render('pages/'+dirName, { title: 'Vozidla', technickyprukaz: results, urad: urad, msg: msg });
                });
            }
        });
    } catch (error) {
        console.error('Error rendering '+sqlName+':', error);
        res.status(500).redirect('/');
    }
});

// Search
router.post('/hledat', (req, res) => {
    try {
        const { id_u, provozovatel, znacka, model, barva, spz, vin, vykon_kw, objem, nej_rychlost, rozmery_kol } = req.body;
        select(id_u, provozovatel, znacka, model, barva, spz, vin, vykon_kw, objem, nej_rychlost, rozmery_kol).then(results => {
            searchData = results;
            res.status(200).redirect('/'+dirName);
        });
    } catch (error) {
        console.error('Error searching '+sqlName+':', error);
        res.status(500).redirect('/'+dirName+'?msg=Chyba při vyhledávání dat');
    }
});

// Adding
router.post("/pridat", (req, res) => {
    try {
        const { id_u, provozovatel, znacka, model, barva, spz, vin, vykon_kw, objem, nej_rychlost, rozmery_kol } = req.body;
        if (id_u, provozovatel, znacka, model, barva, spz, vin, vykon_kw, objem, nej_rychlost, rozmery_kol) {
            let sql = 'INSERT INTO '+ sqlName +' (id_u, provozovatel, znacka, model, barva, spz, vin, vykon_kw, objem, nej_rychlost, rozmery_kol) VALUES (?,?,?,?,?,?,?,?,?,?,?);';
            db.query(sql, [id_u, provozovatel, znacka, model, barva, spz, vin, vykon_kw, objem, nej_rychlost, rozmery_kol], (err, results) => {
                if (!err) {
                    var tp_id = results.insertId;
                    let sql2 = 'INSERT INTO vozidlo (id_tp) VALUES (?);';
                    db.query(sql2, [tp_id], (err, results) => {
                        if (!err) {
                            var v_id = results.insertId;
                            let sql3 = 'UPDATE '+ sqlName +' SET id_v = ? WHERE id_tp = ?;';
                            db.query(sql3, [v_id, tp_id], (err, results) => {
                                if (err) {
                                    console.error('DatabaseError - Insert '+sqlName+':\n', err);
                                    res.status(500).redirect('/'+dirName+'?msg=Chyba při přidávání dat');
                                }
                                else res.status(200).redirect('/'+dirName+'?msg=Data přidána');
                            });
                        }
                    });
                }
                
            });
        }
        else res.status(500).redirect('/'+dirName+'?msg=Chyba při vkládání dat na straně klienta');
    } catch (error) {
        console.error('Error adding '+sqlName+':', error);
        res.status(500).redirect('/'+dirName+'?msg=Chyba při vkládání dat na straně klienta');
    } 
});

// Adding from JSON
/*
router.post("/pridat/json", upload.single('jsonfile'), (req, res) => {
    try {
        if (!req.file) return res.status(400).redirect('/'+dirName+'?msg=Chyba, soubor nebyl nahrán');

        const fileContent = req.file.buffer.toString('utf8');
        const sql = 'INSERT INTO '+ sqlName +' (jmeno, prijmeni, rod_cis, ztp, adresa) VALUES (?,?,?,?,?);';
        
        try {
            const data = JSON.parse(fileContent);
            data.forEach(element => {
                if (element.jmeno && element.prijmeni && element.rod_cis && element.adresa) {
                    db.query(sql, [element.jmeno, element.prijmeni, element.rod_cis, element.ztp, element.adresa], (err, results) => {
                        if (!err) {
                            var id = results.insertId;
                            if (element.ridicskyprukaz.id_u, element.ridicskyprukaz.id_ro, element.ridicskyprukaz.dat_zacatku, element.ridicskyprukaz.dat_konce) {
                                let sql2 = 'INSERT INTO ridicskyprukaz (id_r, id_u, id_ro, dat_zacatku, dat_konce) VALUES (?,?,?,?,?);';
                                db.query(sql2, [id, element.ridicskyprukaz.id_u, element.ridicskyprukaz.id_ro, element.ridicskyprukaz.dat_zacatku, element.ridicskyprukaz.dat_konce], (err, results) => {
                                    if (err) console.error('DatabaseError - Insert ridicskyprukaz:\n', err);
                                    else res.status(200).redirect('/'+dirName+'?msg=Data přidána');
                                });
                            }
                            else {
                                if (err) {
                                    console.log('DatabaseError - Insert '+sqlName+':\n', err);
                                    res.status(500).redirect('/'+dirName+'?msg=Chyba při přidávání dat');
                                }
                                else res.status(200).redirect('/'+dirName+'?msg=Data přidána');
                            }
                        }
                    });
                }
            });
    } catch (error) {
        console.log('Error parsing JSON file:', error);
        res.status(500).redirect('/'+dirName+'?msg=Chyba při zpracování JSON souboru');
    }
    } catch (error) {
        console.log('Error:', error);
    }
    finally {
        res.status(200).redirect('/'+dirName);
    }
});
*/

router.post("/upravit", (req, res) => {
    try {
        const { id_u, provozovatel, znacka, model, barva, spz, vin, vykon_kw, objem, nej_rychlost, rozmery_kol, id_tp} = req.body;

        if (id_u, provozovatel, znacka, model, barva, spz, vin, vykon_kw, objem, nej_rychlost, rozmery_kol, id_tp) {
            let sql = 'UPDATE '+ sqlName +' SET id_u = ?, provozovatel = ?, znacka = ?, model = ?, barva = ?, spz = ?, vin = ?, vykon_kw = ?, objem = ?, nej_rychlost = ?, rozmery_kol = ? WHERE id_tp = ?;';
        
            db.query(sql, [id_u, provozovatel, znacka, model, barva, spz, vin, vykon_kw, objem, nej_rychlost, rozmery_kol, id_tp], (err, results) => {
                if (err) {
                    console.error('DatabaseError - Update '+sqlName+':\n', err);
                    res.status(500).redirect('/'+dirName+'?msg=Chyba při úpravě dat');
                }
                else res.status(200).redirect('/'+dirName+'?msg=Data upravena');
            });
        }  
    } catch (error) {
        console.error('Error editing '+sqlName+':', error);
        res.status(500).redirect('/'+dirName+'?msg=Chyba při úpravě dat na straně klienta');
    }
});


// Deleting
router.post("/smazat", (req, res) => {
    try {
        let sql = 'UPDATE technickyprukaz SET id_v = NULL WHERE id_tp = ?;';
        let sql2 = 'DELETE from vozidlo WHERE id_tp = ?;';
        let sql3 = 'DELETE from technickyprukaz WHERE id_tp = ?;';

        db.query(sql, [req.body.id], (err, results) => {
            if (err) throw err;
            db.query(sql2, [req.body.id], (err, results) => {
                if (err) throw err;
                db.query(sql3, [req.body.id], (err, results) => {
                    if (err) throw err;
                    res.status(200).redirect('/'+dirName+'?msg=Data smazána');
                });
            });
        });
    } catch (error) {
        console.error('Error deleting '+sqlName+':', error);
        res.status(500).redirect('/'+dirName+'?msg=Chyba při mazání dat');
    }
});



// SQL functions
function select(id_u, provozovatel, znacka, model, barva, spz, vin, vykon_kw, objem, nej_rychlost, rozmery_kol) {
    try {
        let sql = 'SELECT * FROM ' + sqlName;
        var data = { id_u, provozovatel, znacka, model, barva, spz, vin, vykon_kw, objem, nej_rychlost, rozmery_kol  };
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
                    console.error('DatabaseError - Select '+sqlName+':\n', err);
                    reject(err);
                } else resolve(results);
            });
        });
    } catch (error) {
        console.error('Error selecting '+sqlName+':', error);
    }
};

module.exports = router;
