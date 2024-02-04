const mysql = require('mysql');
const config = require('./config');

// Database Connection
const db = mysql.createConnection({
  host : config.database.host,
  user : config.database.user,
  password : config.database.password,
  database : config.database.database
});
  
db.connect((err) => {
  if(err){
    throw err;
  }
  console.log('MySQL connected');
});

module.exports = db;
