// trip controller
const catchAsync = require('../utilities/catchAsync');
const Trip = require('../models/trip');
const {getWeather} = require('../services/weather')
const { getCurrency } = require('../services/currency');

module.exports.show = catchAsync(async (req, res) => {
    const tripId = req.params.id;
    const trip = await Trip.findById(tripId);
    console.log(trip.geometry);
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
    if (req.query.budget) {
        const budget = req.query.budget;
        trips = trips.filter((trip) => {
            return trip.base_expenses <= budget;
        });
    }
    // check if season is provided
    if (req.query.season) {
        // capitalize first letter of season
        const season = req.query.season.charAt(0).toUpperCase() + req.query.season.slice(1);
        trips = trips.filter((trip) => {
            return trip.season === season;
        });
    }

    // check if country is provided
    if (req.query.country) {
        const country = req.query.country.charAt(0).toUpperCase() + req.query.country.slice(1);
        trips = trips.filter((trip) => {
            return trip.country === country;
        });
    }
    
    res.status(200).json({ trips });
});

module.exports.create = catchAsync(async (req, res) => {
    let { trip } = req.body;
    console.log("trip:", trip);
    trip = new Trip(trip);
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
        const newTrip = await Trip.findByIdAndUpdate(tripId, req.body, { new: true, runValidators: true });
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
    
