// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const port = 3000;



// Routes
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
  res.render('pages/index')
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
