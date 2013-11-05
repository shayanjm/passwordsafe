module.exports = function (done, mongoose){
    var User = require('../../app/models/user')(mongoose);
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
    user1.update({$push: { vaults: vault1._id }}, function(err){
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
