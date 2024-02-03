const mysql = require('mysql');

// Database Connection
const db = mysql.createConnection({
  host : 'localhost',
  user : 'node',
  password : 'node',
  database : 'ministerstvodopravy'
});
  
db.connect((err) => {
  if(err){
    throw err;
  }
  console.log('MySQL connected');
});

module.exports = db;
