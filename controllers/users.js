'user strict';
const md5 = require('md5');
const model = require('../models/users');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

exports.getAll = function (req, res) {
    model.getUser(function (err, results) {
        if (err) {
            res.status(400).send({ error: true, data: err, message: 'Get data user unsuccessfully !' });
        } else {
            res.status(200).send({ error: false, data: results, message: 'Get all data user successfully !' });
        }
    });
},

exports.getById = function (req, res) {
    model.getUserById(req.params.id, function (err, results) {
        if (err) {
            res.status(400).send({ error: true, data: err, message: 'Get data user with id ' + req.params.id + ' unsuccessfully !' });
        } else {
            res.status(200).send({ error: false, data: results, message: 'Get data user with id ' + req.params.id + ' successfully !' })
        }
    });
},

exports.addUser = function (req, res) {
    let data = {
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(md5(req.body.password), salt)
    };
    if (!data.email || !data.username || !data.password) {
        res.status(400).send({ error: true, message: 'email/username/password empty' })
    } else {
        model.addUser(data, function (err, results) {
            if (err) {
                res.status(400).send({ error: true, data: err, message: 'Add new user unsuccessfully !' });
            } else {
                res.status(200).send({ error: false, data: results, message: 'Add new user successfully !' });
            }
        });
    }
},

exports.updateUser = function (req, res) {
    model.updateUser(req.body.id, req.body.email, req.body.username, req.body.password, function (err, results) {
        if (err) {
            res.status(400).send({ error: true, data: err, message: 'Update data user with id ' + req.body.id + ' unsuccessfully !' });
        } else {
            res.status(200).send({ error: false, data: results, message: 'Update data user with id ' + req.body.id + ' successfully !' });
        }
    });
},

exports.deleteUser = function (req, res) {
    model.deleteUser(req.params.id, function (err, results) {
        if (err) {
            res.status(400).send({ error: true, message: 'Delete data user with id ' + req.params.id + ' unsuccessfully !' });
        } else {
            res.status(200).send({ error: false, message: 'Delete data user with id ' + req.params.id + ' successfully !' });
        }
    });
}