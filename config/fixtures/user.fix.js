module.exports = function (done){
    var mongoose = require('mongoose');
    var config = require('../config');
    mongoose.connect(config.development.db.uri);
    var User = require('../../app/models/user')(mongoose);

    // Let's create a few users.
    user1 = new User({ username: "ShayanTest1", password: "ShayanTest1", email: "shayan@shayan.test", access: 5 });
    user1.save(function(err){
        if(err){
            console.log("ERROR WITH SAVING FIXTURE:" + err)
        }
        else {
            console.log("Successfully saved user: " + user1.username);
        }
        done();
    });

    user2 = new User({ username: "ShayanTest2", password: "ShayanTest2", email: "shayan@shayan.test", access: 1 });
    user1.save(function(err){
        if(err){
            console.log("ERROR WITH SAVING FIXTURE:" + err)
        }
        else {
            console.log("Successfully saved user: " + user2.username);
        }
        done();
    });

    user3 = new User({ username: "ShayanTest3", password: "ShayanTest3", email: "shayan@shayan.test", access: 0 });
    user1.save(function(err){
        if(err){
            console.log("ERROR WITH SAVING FIXTURE:" + err)
        }
        else {
            console.log("Successfully saved user: " + user3.username);
        }
        done();
    });
};
