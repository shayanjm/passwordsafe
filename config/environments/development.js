var express = require('express'),
    path = require('path'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    rest = require('mers')({uri: 'mongodb://localhost/testDB1'});

var User;
function setupRest() {

    // Initialize Models
    require('../../app/models/employee')(rest.mongoose);
    User = require('../../app/models/user')(rest.mongoose);
}
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
        app.use(express.cookieParser('your secret here'));
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

        // Auth Stuff
        passport.serializeUser(function(user, done) {
            done(null, user);
        });
        passport.deserializeUser(function(user, done){
            done(null, obj);
        });
        passport.use(new LocalStrategy(function(username, password, done) {
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
