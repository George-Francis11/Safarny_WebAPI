const { tripSchema, adminSchema } = require('../joiValidators');
const ExpressError = require('../utilities/ExpressError');

module.exports.validateTrip = (req, res, next) => {
    const { error } = tripSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateAdmin = (req, res, next) => {
    const { error } = adminSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}