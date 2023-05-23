// oauth controller with all the logic
// =============================================================================
var mongoose = require('mongoose');
const TokenModel = require('./oauth.model');
const ClientModel = require('./oauth.clients');
const ExpressError = require('../utilities/ExpressError');
const CatchAsync = require('../utilities/catchAsync');


module.exports.verifyToken = async (token) => {
    if (!token) {
        return "not found";
    }
    const foundToken = await TokenModel.findOne({ accessToken: token });
    if (!foundToken) {
        return "not found";
    }
    if (foundToken.expiresOn < Date.now()) {
        return "expired";
    }
    return "verified";
};

module.exports.generateToken = CatchAsync(async (req, res, next) => {
    const {clientId, clientSecret} = req.body;
    const found_client = await ClientModel.findOne({ clientId: clientId, clientSecret: clientSecret });
    if (found_client) {
        // check if the token already exists
        const found_token = await TokenModel.findOne({ clientId: clientId });
        if (!found_token) {
            const accessToken = Math.random().toString(36).slice(2);
            const expiresOn = Date.now() + 300000;
            const refreshToken = Math.random().toString(36).slice(2);
            const token = new TokenModel({
                clientId: clientId,
                clientSecret: clientSecret,
                accessToken: accessToken,
                expiresOn: expiresOn,
                refreshToken: refreshToken
            });
            await token.save();
            res.status(200).send(token);
        }
        else {
        res.status(200).send(found_token);
    }

    } else {
        const err = new ExpressError('Invalid client', 401);
        return next(err);
    }
});

module.exports.refreshToken = CatchAsync(async (req, res, next) => {
    const { clientId, clientSecret, refreshToken } = req.body;
    const found_token = await TokenModel.findOne({ clientId: clientId });
    // console.log(found_token);
    if (!found_token ||
        found_token.clientSecret !== clientSecret ||
        found_token.refreshToken !== refreshToken) {
        const err = new ExpressError('Invalid token', 401);
        return next(err);
    }
    
    found_token.accessToken = Math.random().toString(36).slice(2);
    found_token.expiresOn = Date.now() + 300000;
    const refreshedToken = await TokenModel.findOneAndUpdate({ clientId: clientId }, found_token, { new: true });
    console.log("refreshToken", refreshedToken);
    res.status(200).send(refreshedToken);
});
