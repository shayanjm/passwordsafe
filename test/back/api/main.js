var request = require('supertest');

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
describe('Login via POST /login', function() {
    it('responded with welcome', function(done) {
        request('http://localhost:3000')
            .post('/login')
            .send({username: 'ShayanTest', password: 'ShayanTest'})
            .set('Content-Type', 'application/json')
            .expect('Hello ShayanTest!')
            .end(function(err, res) {
                if(err) return done(err);
                done()
            });
    });
});

describe('Logout via GET /logout', function() {
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

