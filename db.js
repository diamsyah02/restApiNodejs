'user strict';

const mysql = require('mysql');

const connDb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'latihanNodejs'
});

connDb.connect(function(err){
    if(err) throw err;
});

module.exports = connDb;