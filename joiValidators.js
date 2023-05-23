const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.tripSchema = Joi.object({
    trip: Joi.object({
        name: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
        airfare: Joi.number().required().min(0),
        hotel: Joi.number().required().min(0),
        car_rental: Joi.number().required().min(0),
        food: Joi.number().required().min(0),
        activities: Joi.number().required().min(0),
        base_expenses: Joi.number().required().min(0),
        total_per_day: Joi.number().required().min(0),
        currency: Joi.string().required().escapeHTML(),
        food_cuisine: Joi.string().required().valid('American', 'Chinese', 'French', 'Indian', 'Italian', 'Japanese', 'Mexican', 'Thai', 'Vietnamese', 'Egyptian', 'Other' ).escapeHTML(),
        season: Joi.string().required().valid("Summer","Winter").escapeHTML(),
        geometry: Joi.object({
            type: Joi.string().required().valid("Point").escapeHTML(),
            coordinates: Joi.array().required()
        }).required(),
        images: Joi.array().items(Joi.object({
            url: Joi.string().required().escapeHTML(),
            filename: Joi.string().required().escapeHTML()
        })).required()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.adminSchema = Joi.object({
    admin: Joi.object({
        name: Joi.string().required().escapeHTML(),
        email: Joi.string().required().escapeHTML(),
        password: Joi.string().required().escapeHTML(),
        role: Joi.string().escapeHTML()

    }).required()
});