var request = require('supertest');

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

