// trip model
// Dependencies:
//  - mongoose


// Load required packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

// Define our trip schema
const options = { toJSON: { virtuals: true }, timestamps: true };
var TripSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    airfare: {
        type: Number,
        required: true
    },
    hotel:{
        type: Number,
        required: true
    },
    car_rental: {
        type: Number,
        required: true
    },
    food: {
        type: Number,
        required: true
    },
    activities:{
        type: Number,
        required: true
    },
    base_expenses:{
        type: Number,
        required: true
    },
    total_per_day:{
        type: Number,
        required: true
    },
    currency:{
        type: String,
        required: true
    },
    food_cuisine:{
        type: String,
        enum: [ 'American', 'Chinese', 'French', 'Indian', 'Italian', 'Japanese', 'Mexican', 'Thai', 'Vietnamese', 'Egyptian', 'Other' ],
        required: true
    },
    images:
    {
        type: [ImageSchema],
        required: true
    },
    season: {
        type: String,
        enum: ['Summer', 'Winter'],
        required: true
    },
    geometry: {
        type: {
            type: String, 
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
}, options);

TripSchema.virtual('country').get(function () {
    // remove the leading white space
    return this.location.split(',')[1].trim();
});

// Export the Mongoose model
module.exports = mongoose.model('Trip', TripSchema);


