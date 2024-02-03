// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const port = 3000;

const uradRouter = require("./routes/urad");



// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Routes
app.get('/', (req, res) => {
  res.render('pages/index')
});

app.use("/urad", uradRouter);



// Start the server
app.listen(port, 'localhost', () => {
  console.log(`Server is running on http://localhost:${port}`);
});
