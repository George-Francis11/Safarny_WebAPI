// create oauth token model and register it with mongoose
// =============================================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OAuthTokenSchema = new Schema({
    clientId: { type: String },
    clientSecret: { type: String },
    accessToken: { type: String },
    expiresOn: { type: Date },
    refreshToken: { type: String },
});

mongoose.model('OAuthToken', OAuthTokenSchema);
var OAuthTokenModel = mongoose.model('OAuthToken');

module.exports = OAuthTokenModel;