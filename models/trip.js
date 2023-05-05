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
    name: String,
    location: String,
    description: String,
    airfare: Number,
    hotel: Number,
    car_rental: Number,
    food: Number,
    activities: Number,
    base_expenses: Number,
    total_per_day: Number,
    currency: String,
    food_cuisine: String,
    images: [ImageSchema],
    season: {
        type: String,
        enum: ['Summer', 'Winter'],
        required: true
    },
    geometry: {
        type: {
            type: String, 
            enum: ['Point'], // 'location.type' must be 'Point'
            // required: true
        },
        coordinates: {
            type: [Number],
            // required: true
        }
    }
}, options);

TripSchema.virtual('country').get(function () {
    // remove the leading white space
    return this.location.split(',')[1].trim();
});

// Export the Mongoose model
module.exports = mongoose.model('Trip', TripSchema);


