var request = require('supertest');
var config = require('../../../config/config');

// Check that the API is actually alive
describe('GET /api', function() {
    it('respond with json', function(done){
        request('http://localhost:3000')
            .get('/api')
            .set('Accept', 'application/json')
            .expect('PasswordSafe API is running!')
            .end(function(err, res){
                if(err) return done(err);
                done()
            });
    });
});

// Check that we can log in successfully
describe('Successful Login via POST /login', function() {
    it('responded with welcome', function(done) {
        request('http://localhost:3000')
            .post('/login')
            .send({username: 'ShayanTest1', password: 'ShayanTest1'})
            .set('Content-Type', 'application/json')
            .expect('Hello ShayanTest1!')
            .end(function(err, res) {
                if(err) return done(err);
                done()
            });
    });
});

describe('Successful Logout via GET /logout', function() {
    it ('responded with success', function(done) {
        request('http://localhost:3000')
            .get('/logout')
            .set('Accept', 'application/json')
            .expect('You have successfully signed out.')
            .end(function(err, res) {
                if(err) return done(err);
                done()
            });
    });
});

describe ('Unsuccessful Login via POST /login', function() {
    it('responded with unauthorized', function(done) {
        request('http://localhost:3000')
            .post('/login')
            .send({username: 'False', password: 'False'})
            .set('Content-Type', 'application/json')
            .expect('Unauthorized')
            .end(function(err, res) {
                if(err) return done(err);
                done()
            });
    });
});

