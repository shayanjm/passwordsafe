var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var Thing = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

var ThingModel = mongoose.model('Thing', Thing);

// The Exports
module.exports = {
    Thing : Thing
}
