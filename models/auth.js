'user strict';
const db = require('../db');

let login = function(login){
    this.email = login.email;
    this.password = login.password
};

login.login = function(email, results){
    db.query('SELECT * FROM users WHERE email=?', email, function(err, res){
        if(err){
            results(err, null);
        }else{
            results(null, res) 
        }
    });
};

module.exports = login;