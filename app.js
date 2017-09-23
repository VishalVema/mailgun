var express = require('express');

var bodyParser = require('body-parser');

//var mysql = require('mysql');
var mailgun = require('mailgun-js');
var api_key = 'key-77b2b6afef9244a2446362360ec8ceb0';
var domain = 'sandbox803cee5858214f22ab45e3bc90865af7.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


var app = express();

app.set('view engine', 'ejs');

var urlencodedParser = bodyParser.urlencoded({ extended: false});



// var con = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password: "",
// 	database: "mydb"


// });


// con.connect(function(err){
// 	if (err) throw err;
// 	console.log("Connected");

	
// });






app.get('/mail', function(req, res){

  var data = {
  from: 'vishal@sandbox803cee5858214f22ab45e3bc90865af7.mailgun.org',
  to: 'dsharma00722@gmail.com',
  subject: 'Hello new',
  text: 'Testing some Mailgun awesomness!'
};
 

mailgun.post('/routes', {
    'priority' : 1,
    'expression' : 'match_recipient("vishal@sandbox803cee5858214f22ab45e3bc90865af7.mailgun.org")',
    'action' : 'forward("https://requestb.in/1136k9j1")',
    'description' : 'sample description'

}, function (error, body) {
  console.log(body);
});


// console.log(Object.keys(mailgun));

mailgun.messages().send(data, function (error, body) {
  console.log(body);
});


});



var form_data = '';


app.get('/', function (req, res) {
    res.sendFile(__dirname + '\\index.html');

    console.log("server started");
});

// app.get('/contact', function (req, res) {

// 	  var sql = "SELECT * FROM customers ";
//   con.query(sql, function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);

//     var myresult = result;


//     res.render('contact', { thisresult : myresult, name: form_data});

//   });


   
// });


// app.post('/contact', urlencodedParser,  function (req, res) {
// 	console.log(req.body.name);

	

//     form_data = req.body.name;

//     var sql = "INSERT INTO customers (name, address) VALUES ('"+ form_data+ "', 'Blue Village 1')";

//     //res.render('contact', {thisresult : myresult, name: form_data});


//     con.query(sql);

//     return res.redirect('/contact');


//   });



app.get('/profile/:name', function (req, res) {

    var data = {age: 29, job: 'ninja', hobbies: ['eating', 'fighting', 'fishing'] };

    res.render('profile',{person: req.params.name, data: data});
});

app.listen(8080);


