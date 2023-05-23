const ExpressError = require('../utilities/ExpressError');
const {verifyToken} = require('../OAuth/oauth.controller');
const CatchAsync = require('../utilities/catchAsync');
const jwt = require('jsonwebtoken');
const { verifyJwt } = require('../OAuth/jwt.controller');
const AdminModel = require('../models/admin');

module.exports.isLogged = async (req, res, next) => {
    const token = req.headers.oauth;
    const verification = await verifyToken(token);
    // create a case for each verification status
    if (verification === "verified") {
        return next();
    }
    else if (verification === "not found") {
        const err = new ExpressError('Invalid token', 401);
        return next(err);
    } else if (verification === "expired") {
        const err = new ExpressError('Your token has expired', 403);
        return next(err);
    }
}

module.exports.isAdmin = CatchAsync(async (req, res, next) => {
    const jwt = req.headers.authorization;
    if (!jwt) {
        const err = new ExpressError('You must be logged in first', 401);
        return next(err);
    }
    const verification = await verifyJwt(jwt);
    if (verification === false) {
        const err = new ExpressError('Invalid token', 401);
        return next(err);
    }
    const found_admin = await AdminModel.findOne({ _id: verification.userId });
    if (!found_admin) {
        const err = new ExpressError('You must be an admin first', 401);
        return next(err);
    }

    if (found_admin.role === "admin" || found_admin.role === "super-admin") {
        return next();
    } 

    const err = new ExpressError('You must be an admin first', 401);
    return next(err);
});


module.exports.isSuperAdmin = CatchAsync(async (req, res, next) => {
    const jwt = req.headers.authorization;
    if (!jwt) {
        const err = new ExpressError('You must be logged in first', 401);
        return next(err);
    }
    const verification = await verifyJwt(jwt);
    if (verification === false) {
        const err = new ExpressError('Invalid token', 401);
        return next(err);
    }
    console.log(verification);
    const found_admin = await AdminModel.findOne({ _id: verification.userId });
    if (!found_admin) {
        const err = new ExpressError('You must be a super admin first', 401);
        return next(err);
    }
    console.log(found_admin);

    if (found_admin.role === "super-admin") {
        return next();
    } 

    const err = new ExpressError('You must be a super admin first', 401);
    return next(err);
});