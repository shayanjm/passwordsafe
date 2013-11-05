module.exports = function(done, mongoose) {
    var Schema = mongoose.Schema;
    var VaultSchema = new Schema({
        owner: { type: Schema.Types.ObjectId, ref: 'User' },
        applications: [{
            name: { type: String, required: true },
            username: { type: String, required: true },
            password: { type: String, required: true }
        }]
    });

    var Vault = mongoose.model('vault', VaultSchema);
    return Vault;
};
