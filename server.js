const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var mysql = require('mysql');

const app = express();



var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
  host: 'localhost', //localhost:3306
  user: 'root', //16user1
  password: 'root', //zPz~j456
  database: 'Test_16_db'
});

const route = express.Router();

const db = require("./app/models");
const Role = db.role;

connection.connect();

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

app.use('/v1', route);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

connection.query('select * from markers', function (err, rows, fields) {
  if (err) throw err;
  console.log('hello')
  app.use('/markers', (req, res) => {
    res.send({
      rows: rows
    });
  });
  console.log(rows)
});

route.post('/new-marker', (req, res) => {
  const { lat, lng } = req.body;
  console.log('body: ', req.body);

  var sql = "INSERT INTO `markers`(`latitude`, `longitude`) VALUES ('" + lat + "','" + lng + "')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result)
    res.send({
      rows: result
    });
  });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
  }
