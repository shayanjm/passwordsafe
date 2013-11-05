module.exports = function(mongoose) {
    var Schema = mongoose.schema;
    var SafeSchema = new Schema({
        owner: { type: Schema.Types.ObjectId, ref: 'User' },
        applications: [{
            name: { type: String, required: true },
            username: { type: String, required: true },
            password: { type: String, required: true }
        }]
    });
};
