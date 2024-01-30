import "database.js";


const express = require('express');
const app = express();
const port = 3000;

/*
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
})

*/

// Client-Side
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/public/index.html');
});


// Handle POST requests to add data to the database
app.post('/addData', (req, res) => {
  const { name, email } = req.body;


  // Perform the database query to insert data
  const query = 'INSERT INTO your_table_name (name, email) VALUES (?, ?)';
  connection.query(query, [name, email], (err, results) => {
    if (err) {
      console.error('Error adding data to the database:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('Data added to the database successfully');
    }
  });
});



// Start the app
app.listen(port, 'localhost', () => {
  console.log(`Application is running on http://localhost:${port}`);
});
