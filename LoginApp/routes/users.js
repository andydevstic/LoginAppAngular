var express = require('express');
var validateUser = require('../node_modules/signup-validation/validation');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'angular-project'
});


con.connect();

//Check JWT to see whether user is currently logged in or not.
//Developping

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//If user is not logged in: Let user register.
router.post('/', function(req, res, next) {

  var userName = req.body.userName;
  var userPassword = req.body.userPassword;
  var userConfirmPassword = req.body.userPassword;


  var checkRegister = validateUser.validateRegister(userName, userPassword, userConfirmPassword);

  if ( checkRegister == "true" ){
    var query = `INSERT INTO tbl_users(name, password) VALUES(${userName}, ${userPassword})`;

    con.query(query, function(err, rows, fields){
      if (err) throw err;
      res.send("Registered successfully!");
    });
  } else {
    res.send("Can't register!");
  }
  
});


module.exports = router;
