const ExpressError = require('../utilities/ExpressError');

module.exports.isLogged = (req, res, next) => {
    if (1 === 1) {
        return next();
    } else {
        // raise error using the Expresserror class
        const err = new ExpressError('You must be logged in first', 401);
        return next(err);
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (1 === 1) {
        return next();
    } else {
        // raise error using the Expresserror class
        const err = new ExpressError('You must be an admin first', 401);
        return next(err);
    }
}

module.exports.isSuperAdmin = (req, res, next) => {
    if (1 === 1) {
        return next();
    } else {
        // raise error using the Expresserror class
        const err = new ExpressError('You must be a super admin first', 401);
        return next(err);
    }
}