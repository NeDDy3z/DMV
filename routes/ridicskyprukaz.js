// Table - Řidičský průkaz
// Dependencies
const express = require("express");
const router = express.Router();
const db = require('../database');

const tableName = 'ridicskyprukaz';



// Routing
// Adding
router.post("/pridat", (req, res) => {
    try {
        const { id_r, id_u, id_ro, dat_zacatku, dat_konce } = req.body;
        if (id_r, id_u, id_ro, dat_zacatku, dat_konce) {
            let sql = 'INSERT INTO '+ tableName +' (id_r, id_u, id_ro, dat_zacatku, dat_konce) VALUES (?,?,?,?,?);';
            db.query(sql, [id_r, id_u, id_ro, dat_zacatku, dat_konce], (err, results) => {
                if (err) {
                    console.error('DatabaseError - Insert '+tableName+':\n', err);
                    res.status(500).redirect('/ridic?msg=Chyba při přidávání dat');
                }
                else res.status(200).redirect('/ridic?msg=Data přidána');
            });
        }
        else res.status(500).redirect('/ridic?msg=Chyba při vkládání dat na straně klienta');
    } catch (error) {
        console.error('Error adding '+tableName+':', error);
        res.status(500).redirect('/ridic?msg=Chyba při přidávání dat ŘP');
    }
});

// Deleting
router.post("/smazat", (req, res) => {
    try {
        let sql = 'DELETE FROM '+ tableName +' WHERE id_rp = ?';

        db.query(sql, [req.body.id_rp], (err, results) => {
            if (err) {
                console.error('DatabaseError - Delete '+tableName+':\n', err);
                res.status(500).redirect('/ridic?msg=Cyhba při mazání dat');
            }
            else res.status(200).redirect('/ridic?msg=Data smazána');
        });
    } catch (error) {
        console.error('Error deleting '+tableName+':', error);
        res.status(500).redirect('/ridic?msg=Chyba při mazání dat ŘP');
    }
});

module.exports = router;
