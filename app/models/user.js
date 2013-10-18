module.exports = function(mongoose) {
    var bcrypt = require('bcrypt');
    var SALT_WORK_FACTOR = 10;
    var Schema = mongoose.Schema;
    var UserSchema = new Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true},
        admin: { type: Boolean, required: true }
    });

    UserSchema.pre('save', function (next) {
        var user = this;

        if(!user.isModified('password')) return next();

        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    });

    UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
    };

    var User = mongoose.model('user', UserSchema);
    var user = new User({ username: 'shayanjm6', password: 'test6', email: 'test@test.test6', admin: true });
    user.save();

    return User;
};
