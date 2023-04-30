// trip model
// Dependencies:
//  - mongoose


// Load required packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

// Export the Mongoose model
module.exports = mongoose.model('Trip', TripSchema);


