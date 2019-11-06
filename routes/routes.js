'use strict';
module.exports = function(app){
    let users = require('../controllers/users');
    let auth = require('../controllers/auth');
    let middleware = require('../middleware/users');

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