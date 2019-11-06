let jwt = require('jsonwebtoken');
const config = require('../config/config');

let checkToken = (req, res, next) => {
    let token = req.headers.authorization;
    if(token){
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err){
                return res.send({
                    error: true,
                    message: 'Token is not valid !'
                });
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }else{
        return res.send({
            error: true,
            message: 'Token is not supplied !'
        });
    }
};

module.exports = {
    checkToken: checkToken
}