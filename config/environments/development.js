var express = require('express'),
    path = require('path'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    config = require('../config'),
    mongoose = require('mongoose'),
    rest = require('mers')({uri: config.development.db.uri});

// Set up Mongoose
mongoose.connect(config.development.db.uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error to MongoDB: '));
db.once('open', function callback() {
    console.log('Mongoose is now connected to MongoDB');
});

// Setup our RESTful API
var User;
var Safe;
function setupRest() {

    // Initialize Models to be exposed by API
    require('../../app/models/employee')(rest.mongoose);

    // Initialize Models not to be exposed by API
    User = require('../../app/models/user')(mongoose);
    Vault = require('../../app/models/vault')(mongoose);

    // We want to only deliver the payload when we expose our API.
    rest.responseStream.prototype.format = function (data) {
        return JSON.stringify(data.payload);
    }
}

// Setup Express & PassportJS
module.exports = function (app) {
    app.configure('development', function () {
        app.use(function staticsPlaceholder(req, res, next) {
            return next();
        });
        app.set('port', process.env.PORT || 9000);
        app.set('views', path.join(app.directory, '/app'));
        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'html');
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser('uwotm8?'));
        app.use(express.session());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use('/api', rest.rest());

        app.use(function middlewarePlaceholder(req, res, next) {
          return next();
        });

        app.use(app.router);
        app.use(express.errorHandler());
        setupRest();

        // Authentication Stuff
        passport.serializeUser(function(user, done) {
            done(null, user);
        });
        passport.deserializeUser(function(user, done){
            done(null, obj);
        });
        passport.use('user', new LocalStrategy(function(username, password, done) {
            User.findOne({ username: username }, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
                user.comparePassword(password, function(err, isMatch) {
                  if (err) return done(err);
                  if(isMatch) {
                    return done(null, user);
                  } else {
                    return done(null, false, { message: 'Invalid password' });
                  }
                });
            });
          }
        ));

    });
};
