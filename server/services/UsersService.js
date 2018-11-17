var User = require('../models/UserModel');
var jwt = require('jsonwebtoken');
var config = require('../../config');
const JWT_SECRET = config.jwt.secret;
var usersRepository = require('../repositories/UsersRepository');

module.exports = { 

    //Get a user by username
    getUser: function(userid, done) {
        var user = new User ({
            username: userid
        });
        usersRepository.getUser(user, function(dbUser) {
            if (dbUser[0] === undefined) {
                return done({
                    "status": 400,
                    "message": "That user does not exist."
                })
            }
            else {
                console.log(dbUser[0]);
                var returnedUser = new User({
                    username: dbUser[0].username,
                    id: dbUser[0]._id.toString(),
                    isAdmin: dbUser[0].isAdmin
                });
                return done({
                    "status": 200,
                    "user": returnedUser
                })
            }

        });
    }
    
}