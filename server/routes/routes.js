
const userController = require('../controllers/UsersController');
const imageController = require('../controllers/ImagesController');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var fs = require('fs');
const JWT_SECRET = config.jwt.secret;

module.exports = function(app) {

    //--------USERS--------//
    //Read User
    app.get('/api/user/:userid', function(req, res) {
        userController.getUser(req.params.userid, (result) => {
            res.send(result);
        })
    });


    //--------IBM IMAGE RECOGNITION--------//
    app.post('/api/image', function(req, res) {
        imageController.getImageCategory(req.params, (result) => {
            res.send(result);
        })
    })
}
