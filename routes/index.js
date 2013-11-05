module.exports = function (app) {
    app.get('/', function (req, res, next) {
        res.render('index', {
            title: 'Express'
        });
    });


// REST API

    app.get('/api', function (req, res) {
        res.send('PasswordSafe API is running!');
    });

    app.post('/login',
      passport.authenticate('user'),
      function(req, res) {
        res.send('Hello ' + req.user.username + '!');
      });

    app.post('/getVault',
        passport.authenticate('vault'),
        function(req,res) {
            res.send('You now have access to Vault ' + req.vault.name + '.');
        });

    app.get('/logout', function(req, res){
      req.logout();
      res.send('You have successfully signed out.');
    });

    app.get('/check', function(req, res){
        if(req.isAuthenticated()){
            res.send('You are authenticated');
        }
        else {
            res.send('You are not authenticated');
        }
    });
};
