module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var VaultSchema = new Schema({
        owner: { type: Schema.Types.ObjectId, ref: 'User' },
        combination: { type: String, required: true },
        applications: [{
            name: { type: String, required: true },
            username: { type: String, required: true },
            password: { type: String, required: true }
        }]
    });

    VaultSchema.pre('save', function (next) {
        var vault = this;

        if(!vault.isModified('combination')) return next();

        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(vault.combination, salt, function(err, hash) {
                if(err) return next(err);
                vault.combination = hash;
                next();
            });
        });
    });

    VaultSchema.methods.compareCombination = function(candidateCombination, cb) {
        bcrypt.compare(candidateCombination, this.combination, function(err, isMatch) {
            if(err) return cb(err);
            cb(null, isMatch);
        });
    };

    var Vault = mongoose.model('vault', VaultSchema);
    return Vault;
};
