// Table - Osoba
const express = require('express');
const router = express.Router();
const db = require('../database');


function insertOsoba(jmeno, prijmeni, rod_cis, ztp, adresa) {
    let sql = 'INSERT INTO osoba (jmeno, prijmeni, rod_cis, ztp, adresa) VALUES (?, ?, ?, ?, ?);';

    db.query(sql, [jmeno, prijmeni, rod_cis, ztp, adresa], (err, results) => {
        if (err) {
          console.error('DatabaseError  - InsertOsoba: ', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send('Success - InsertOsoba');
        }
    });
};

function selectOsoba(jmeno, prijmeni, rod_cis, ztp, adresa) {
  let sql = 'SELECT * FROM osoba';

};