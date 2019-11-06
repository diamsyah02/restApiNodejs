const express = require('express');
const app = express();
bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mysql = require('mysql');
var routes = require('./routes/routes');

const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'latihannodejs'
});
 
// connect to database
mc.connect();

app.listen(port);
console.log('todo list RESTful API server started on: ' + port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);

// Diamsyah M Dida
// Technology Enthusiast 