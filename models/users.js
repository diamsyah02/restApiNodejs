'user strict';
const db = require('../db');

let user = function(user){
    this.email = user.email;
    this.username = user.username;
    this.password = user.password
};

user.addUser = function(newUser, results){
    db.query('INSERT INTO users SET ? ', newUser, function(err, res){
        if(err){
            results(err, null);
        }else{
            results(null, res.insertId)
        }
    });
};

user.getUserById = function(id, results){
    db.query('SELECT * FROM users WHERE id=?', id, function(err, res){
        if(err){
            results(err, null);
        }else{
            results(null, res);
        }
    });
};

user.getUser = function(results){
    db.query('SELECT * FROM users', function(err, res){
        if(err){
            results(err, null);
        }else{
            results(null, res);
        }
    });
};

user.updateUser = function(id, email, username, password, results){
    db.query('UPDATE users SET email = ?, username = ?, password = ? WHERE id = ?', [email, username, password, id], function(err, res){
        if(err){
            results(err, null);
        }else{
            results(null, res);
        }
    });
};

user.deleteUser = function(id, results){
    db.query('DELETE FROM users WHERE id = ?', id, function(err, res){
        if(err){
            results(err, null);
        }else{
            results(null, res);
        }
    });
};

module.exports = user;