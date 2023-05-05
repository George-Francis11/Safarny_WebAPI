const mongoose = require('mongoose');
const Trips = require('../models/trip');
const Admin = require('../models/admin');
const { tripsSeeds } = require('./tripsSeeds');
const { adminSeeds } = require('./adminSeeds');

mongoose.connect('mongodb://127.0.0.1:27017/web-api-cw', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { 
        console.log('Hello from the DB');
    })
    .catch((err) => { 
        console.log('Connection failed!',err);
    })
mongoose.set('strictQuery', false);


const seedTrips = tripsSeeds;

const SeedDb = async () => {
    await Trips.deleteMany({});
    await Trips.insertMany(seedTrips);
    console.log('Trips DB seeded');
    await Admin.deleteMany({});
    await Admin.insertMany(adminSeeds);
    console.log('Admin DB seeded');
}

SeedDb().then(() => {
    mongoose.connection.close();
    console.log('Connection closed successfully');
});

    