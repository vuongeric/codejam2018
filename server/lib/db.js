const config = require('../../config');
const assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var mongoURL= config.db;
var mongoEnv;

module.exports = {
    connectToServer: function() {

        MongoClient.connect(mongoURL, {useNewUrlParser: true}, function(err, client) {
            assert.equal(null, err);
            mongoEnv = client;
            console.log("Connected to MongoDB");
        });
    },

    getDb: function() {
        return mongoEnv.db('fudo_users');
    }
}

