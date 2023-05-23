var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
    clientId: { type: String },
    clientSecret: { type: String }
});

mongoose.model('Client', ClientSchema);
var ClientModel = mongoose.model('Client');

module.exports = ClientModel;