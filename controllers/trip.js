// trip controller
const catchAsync = require('../utilities/catchAsync');
const Trip = require('../models/trip');
const {getWeather} = require('../services/weather')
const { getCurrency } = require('../services/currency');

module.exports.show = catchAsync(async (req, res) => {
    const tripId = req.params.id;
    const trip = await Trip.findById(tripId);
    const weatherData = await getWeather(
        trip.geometry.coordinates[1],
        trip.geometry.coordinates[0],
        req.query.startDate,
        req.query.endDate);
    const currencyData = await getCurrency(trip.currency);
    // trip.weather = weatherData;
    // trip.currency = currencyData;
    res.status(201).json({ trip, weatherData, currencyData});
});

module.exports.index = catchAsync(async (req, res) => {
    var trips = await Trip.find({});
    // check if budget is provided
    if (req.query.budget && req.query.startDate && req.query.endDate) {
        const { startDate, endDate, budget } = req.query;
        const duration = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
        trips = trips.filter((trip) => {
            return (trip.base_expenses + (trip.total_per_day * duration)) <= budget;
        });
    }
    res.status(200).json({ trips });
});

module.exports.create = catchAsync(async (req, res) => {
    const trip = new Trip(req.body);
    await trip.save();
    res.status(201).json({ trip });
});

module.exports.put = catchAsync(async (req, res) => {
    const tripId = req.params.id;
    const foundTrip = await Trip.findById(tripId);
    if (!foundTrip) {
        return res.status(404).json({ error: 'Trip not found' });
    }
    else {
        const newTrip = await Trip.findByIdAndUpdate(tripId);
        if (!newTrip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        else {
            return res.status(200).json({ newTrip });
        }
    }
});

module.exports.deleteTrip = catchAsync(async (req, res) => {
    const tripId = req.params.id;
    const foundTrip = await Trip.findById(tripId);
    if (!foundTrip) {
        return res.status(404).json({ error: 'Trip not found' });
    }
    else {
        const trip = await Trip.findByIdAndDelete(tripId);
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        else {
            return res.status(200).json({ trip });
        }
    }
});
    

// module.exports.getSuitableTrips = catchAsync(async (req, res) => {
//     const { startDate, endDate, budget } = req.query;
//     const duration = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
//     const trips = await Trip.find({});
//     const suitableTrips = trips.filter((trip) => {
//         return (trip.base_expenses + (trip.total_per_day*duration)) <= budget;
//     });
//     res.status(200).json({ suitableTrips });
// });