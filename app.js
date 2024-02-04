// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const path = require("path");
const app = express();
const port = 3000;



// Routing
const uradRouter = require("./routes/urad");
const ridicRouter = require("./routes/ridic");
const ridicskyprukazRouter = require("./routes/ridicskyprukaz");
const ridicskeopravneniRouter = require("./routes/ridicskeopravneni");
const vozidloRouter = require("./routes/vozidlo");



// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Routes
app.get('/', (req, res) => {
  if (searchData.length > 0) {
    res.render('pages/index', { data: searchData });
    console.log(searchData);
    searchData = [];
  }
  else {
    res.render('pages/index', { data: null });
  }
});

let searchData = [];
app.post('/report', (req, res) => {
  try {
    db.query("SELECT COUNT(*) AS pocet FROM urad WHERE adresa LIKE '%Praha%';", (err, urad) => {
      db.query("SELECT COUNT(*) AS pocet FROM ridic WHERE ztp = 1;", (err, ridic) => {
        db.query("SELECT COUNT(*) AS pocet FROM technickyprukaz WHERE vykon_kw > 50;", (err, vozidlo) => {
          if (urad[0].pocet === undefined) urad[0].pocet = 0;
          if (ridic[0].pocet === undefined) ridic[0].pocet = 0;
          if (vozidlo[0].pocet === undefined) vozidlo[0].pocet = 0;
          searchData = [ urad[0].pocet, ridic[0].pocet, vozidlo[0].pocet ];
          res.status(200).redirect('/');
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
});

app.use("/urad", uradRouter);
app.use("/ridic", ridicRouter);
app.use("/ridicskyprukaz", ridicskyprukazRouter);
app.use("/ridicskeopravneni", ridicskeopravneniRouter);
app.use("/vozidlo", vozidloRouter);



// Start the server
app.listen(port, 'localhost', () => {
  console.log(`Server is running on http://localhost:${port}`);
});
