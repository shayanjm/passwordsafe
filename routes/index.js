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

};
