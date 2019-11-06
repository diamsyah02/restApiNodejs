'user strict';
const md5 = require('md5');
const model = require('../models/auth');
var jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.login = function(req, res){
    let email = req.body.email;
    let password = md5(req.body.password);
    model.login(email, function(err, results){
        if(err){
            res.status(400).send({error: true, message: 'Your login unsuccessfully !'});
        }else{
            if(password == results[0].password){
                let token = jwt.sign({email: email}, config.secret);
                res.status(200).send({error: false, data: results, token: token, message: 'Your login successfully !'});
            }else{
                res.status(400).send({error: true, message: 'Your login unsuccessfully !'});
            }
        }
    });
}