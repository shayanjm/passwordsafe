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

    // POST to CREATE
    app.post('/api/things', function (req, res) {
        var thing;
        console.log("POST to things: " + req.body);

        thing = new Thing({
            title: req.body.title,
            description: req.body.description
        });
        thing.save(function (err) {
            if (!err) {
                return console.log("Created new Thing " + req.body.title);
            } else {
                return console.log(err);
            }
        });
        return res.send(thing);
    });
};
