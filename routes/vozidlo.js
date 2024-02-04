// Table - Vozidlo
// Dependencies
const express = require("express");
const multer = require('multer');
const router = express.Router();
const db = require('../database');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const tableName = 'vozidlo';
let searchData = [];



// Routing
// Default page
router.get('/', (req, res) => {
    try {
        let msg = req.query.msg ? req.query.msg : '';
        db.query('SELECT * FROM urad;', (err, urad) => {
            db.query('SELECT * FROM ridicskeopravneni;', (err, ridicskeopravneni) => {
                db.query("SELECT r.id_rp, r.id_r, u.nazev as 'urad', ro.oznaceni as 'oznaceni', r.dat_zacatku, r.dat_konce FROM ridicskyprukaz r JOIN urad u ON r.id_u = u.id_u JOIN ridicskeopravneni ro ON r.id_ro = ro.id_ro;", (err, ridicskyprukaz) => {
                    if (searchData.length > 0) res.render('pages/'+tableName, { title: 'Vozidla', vozidlo: null, ridic: searchData, ridicskyprukaz: ridicskyprukaz, urad: urad, ridicskeopravneni: ridicskeopravneni , msg: msg });
                    else {
                        select().then(results => {
                            res.render('pages/'+tableName, { title: 'Vozidla', vozidlo: null, ridic: results, ridicskyprukaz: ridicskyprukaz, urad: urad, ridicskeopravneni: ridicskeopravneni, msg: msg });
                        });
                    } 
                });
            });
        });
    } catch (error) {
        console.error('Error rendering '+tableName+':', error);
        res.status(500).redirect('/');
    }
});

// Search
router.post('/hledat', (req, res) => {
    try {
        const { jmeno, prijmeni, rod_cis, ztp, adresa } = req.body;
        select(jmeno, prijmeni, rod_cis, ztp, adresa).then(results => {
            searchData = results;
            res.status(200).redirect('/'+tableName);
        });
    } catch (error) {
        console.error('Error searching '+tableName+':', error);
        res.status(500).redirect('/'+tableName+'?msg=Chyba při vyhledávání dat');
    }
});

// Adding
router.post("/pridat", (req, res) => {
    try {
        const { jmeno, prijmeni, rod_cis, ztp, adresa, urad, oznaceni, dat_zacatku, dat_konce } = req.body;
        // Check if dat_zacatku is before dat_konce - prdím na to, stejně to není perfektní takže who cares 🤪...
        if (jmeno, prijmeni, rod_cis, adresa) {
            let sql = 'INSERT INTO '+ tableName +' (jmeno, prijmeni, rod_cis, ztp, adresa) VALUES (?,?,?,?,?);';
            db.query(sql, [jmeno, prijmeni, rod_cis, ztp, adresa], (err, results) => {
                var id = results.insertId;
                if (urad, oznaceni, dat_zacatku, dat_konce) {
                    let sql2 = 'INSERT INTO ridicskyprukaz (id_r, id_u, id_ro, dat_zacatku, dat_konce) VALUES (?,?,?,?,?);';
                    db.query(sql2, [id, urad, oznaceni, dat_zacatku, dat_konce], (err, results) => {
                        if (err) console.error('DatabaseError - Insert ridicskyprukaz:\n', err);
                        else res.status(200).redirect('/'+tableName+'?msg=Data přidána');
                    });
                }
                else if (err) {
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
        const sql = 'INSERT INTO '+ tableName +' (jmeno, prijmeni, rod_cis, ztp, adresa) VALUES (?,?,?,?,?);';
        
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
                                    else res.status(200).redirect('/'+tableName+'?msg=Data přidána');
                                });
                            }
                            else {
                                if (err) {
                                    console.log('DatabaseError - Insert '+tableName+':\n', err);
                                    res.status(500).redirect('/'+tableName+'?msg=Chyba při přidávání dat');
                                }
                                else res.status(200).redirect('/'+tableName+'?msg=Data přidána');
                            }
                        }
                    });
                }
            });
    } catch (error) {
        console.log('Error parsing JSON file:', error);
        res.status(500).redirect('/'+tableName+'?msg=Chyba při zpracování JSON souboru');
    }
    } catch (error) {
        console.log('Error:', error);
    }
    finally {
        res.status(200).redirect('/'+tableName);
    }
});

router.post("/upravit", (req, res) => {
    try {
        const { id, jmeno, prijmeni, rod_cis, ztp, adresa } = req.body;

        if (id, jmeno, prijmeni, rod_cis, ztp, adresa) {
            let sql = 'UPDATE '+ tableName +' SET jmeno = ?, prijmeni = ?, rod_cis = ?, ztp = ?, adresa = ? WHERE id_r = ?;';
        
            db.query(sql, [jmeno, prijmeni, rod_cis, ztp, adresa, id], (err, results) => {
                if (err) {
                    console.error('DatabaseError - Insert '+tableName+':\n', err);
                    res.status(500).redirect('/'+tableName+'?msg=Chyba při úpravě dat');
                }
                else res.status(200).redirect('/'+tableName+'?msg=Data upravena');
            });
        }  
    } catch (error) {
        console.error('Error editing '+tableName+':', error);
        res.status(500).redirect('/'+tableName+'?msg=Chyba při úpravě dat na straně klienta');
    }
});

// Deleting
router.post("/smazat", (req, res) => {
    try {
        let sql = 'DELETE FROM ridicskyprukaz WHERE id_r = ?;'
        let sql2 = 'DELETE FROM '+ tableName +' WHERE id_r = ?';
    
        db.query(sql, [req.body.id], (err, results) => {
            db.query(sql2, [req.body.id], (err, results) => {
                res.status(200).redirect('/'+tableName+'?msg=Data smazána');
            });
        });
    } catch (error) {
        console.error('Error deleting '+tableName+':', error);
        res.status(500).redirect('/'+tableName+'?msg=Chyba při mazání dat');
    }
});
  


// SQL functions
function select(jmeno, prijmeni, rod_cis, ztp, adresa) {
    try {
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
    } catch (error) {
        console.error('Error selecting '+tableName+':', error);
    }
};

module.exports = router;
