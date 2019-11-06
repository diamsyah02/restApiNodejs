'use strict';
module.exports = function (app) {
    let users = require('../controllers/users');
    let auth = require('../controllers/auth');
    let middleware = require('../middleware/users');
    let multer = require('../config/multer');

    // upload
    app.route('/upload').post(multer.upload.single('file'), function (req, res, next) {
        if (!req.file) {
            res.status(500).send({ error: true, message: 'Upload unsuccessfully !' });
            return next(err);
        }else{
            res.status(200).send({ error: false, file: req.file, message: 'Upload successfully !' });   
        }
    });

    // route user
    app.route('/users')
        .get(middleware.checkToken, users.getAll)
        .post(middleware.checkToken, users.addUser);

    app.route('/users/:id')
        .get(middleware.checkToken, users.getById)
        .post(middleware.checkToken, users.updateUser)
        .delete(middleware.checkToken, users.deleteUser);

    // Auth
    app.route('/login')
        .post(auth.login);
};