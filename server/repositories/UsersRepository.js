var mongoDb = require('../lib/db');

module.exports = { 

    //Get a user by username
    getUser: function(user, done) {
        var db = mongoDb.getDb();
        db.collection('users').find({
            "username": user.username
        }).toArray( (err, docs) => {
            return done(docs);
        });
    }
}