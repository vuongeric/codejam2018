
const userController = require('../controllers/UsersController');
var jwt = require('jsonwebtoken');
var config = require('../../config');
const JWT_SECRET = config.jwt.secret;

module.exports = function(app) {

    //--------USERS--------//
    //Read User
    app.get('/api/user/:userid', function(req, res) {
        userController.getUser(req.params.userid, (result) => {
            res.send(result);
        })
    });

}
