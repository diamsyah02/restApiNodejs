'use strict';
module.exports = function (app) {
    let users = require('../controllers/users');
    let auth = require('../controllers/auth');
    let middleware = require('../middleware/users');
    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './assets/images');
        },
        filename: (req, file, cb) => {
            console.log(file);
            var filetype = '';
            if (file.mimetype === 'image/gif') {
                filetype = 'gif';
            }
            if (file.mimetype === 'image/png') {
                filetype = 'png';
            }
            if (file.mimetype === 'image/jpeg') {
                filetype = 'jpg';
            }
            cb(null, 'image-' + Date.now() + '.' + filetype);
        }
    });
    var upload = multer({ storage: storage });

    // upload
    app.route('/upload').post(upload.single('file'),function(req, res, next) {
        if(!req.file) {
          res.status(500).send({error: true, message: 'Upload unsuccessfully !'});
          return next(err);
        }
        res.status(200).send({ error: false, file: req.file, message: 'Upload successfully !' });
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