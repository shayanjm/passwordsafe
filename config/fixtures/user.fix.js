module.exports = function (done, mongoose){
    var User = require('../../app/models/user')(mongoose);

    // Let's create a few users.

    // User 1 -> Regular user with a safe.
    var user1 = new User({ username: "ShayanTest1", password: "ShayanTest1", email: "shayan@shayan.test", access: 5 });
    user1.save(function(err){
        if(err){
            console.log("ERROR WITH SAVING FIXTURE:" + err);
            done(err);
        }
        else {
            console.log("Successfully saved user: " + user1.username);
            done();
        }
    });

    var user2 = new User({ username: "ShayanTest2", password: "ShayanTest2", email: "shayan@shayan.test", access: 1 });
    user2.save(function(err){
        if(err){
            console.log("ERROR WITH SAVING FIXTURE:" + err);
            done(err);
        }
        else {
            console.log("Successfully saved user: " + user2.username);
            done();
        }
    });

    var user3 = new User({ username: "ShayanTest3", password: "ShayanTest3", email: "shayan@shayan.test", access: 0 });
    user3.save(function(err){
        if(err){
            console.log("ERROR WITH SAVING FIXTURE:" + err);
            done(err);
        }
        else {
            console.log("Successfully saved user: " + user3.username);
            done();
        }
    });

    var Vault = require('../../app/models/vault')(mongoose);

    // Let's create a user with a vault.
    var user1 = new User({ username: "ShayanTestVault", password: "ShayanTestVault", email: "shayan@shayan.test", access: 5 });
    user1.save(function(err){
        if(err){
            console.log("ERROR WITH SAVING FIXTURE:" + err);
            done(err);
        }
        else {
            console.log("Successfully saved user: " + user1.username);
            done();
        }
    });

    var vault1 = new Vault({ 'owner': user1._id, 'applications':[{ name: 'TestApp', username: 'ShayanTest1', password: 'ShayanTest1' }] });
    vault1.save(function(err){
        if(err){
            console.log("ERROR WITH SAVING FIXTURE:" + err);
            done(err);
        }
        else {
            console.log("Successfully saved vault for owner: " + safe1.owner);
            done();
        }
    });

    // And now we update our user with the new vault ID.
    User.findByIdAndUpdate(user1._id, {$push: { vaults: vault1._id }}, function(err){
        if(err){
            console.log("ERROR WITH UPDATING FIXTURE:" + err);
            done(err);
        }
        else{
            console.log("Successfully updated User1 with new vault ID " + vault1._id);
            done();
        }
    });
};
