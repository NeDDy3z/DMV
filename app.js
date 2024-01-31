// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database.js');
const app = express();

// Server Port
const port = 3000;




// Client-Side
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/public/index.html');
});

app.post('/insert', (req, res) => {
  console.log(req.body.table);
  /*
  switch (req.body.table) {
    case 'urad' : db.insertUrad(req.body.nazev);
      break;  
    default: console.log("err");
      break;
  }


  const name = req.body.name;
  const email = req.body.email;

  const params = [name, email];

  db.query(sql, params, (err, result) => {
      if (err) throw err;
    res.redirect('/');
  });
  */
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
  console.log(`Server is running on http://localhost:${port}`);
});
