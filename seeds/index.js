if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const mongoose = require('mongoose');
const Trips = require('../models/trip');
const Admin = require('../models/admin');
const Client = require('../OAuth/oauth.clients');
const { tripsSeeds } = require('./tripsSeeds');
const { adminSeeds } = require('./adminSeeds');
const { clientSeeds } = require('./clientSeeds');

const url = process.env.MONGO_CONNECTION_STRING
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
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
    await Client.deleteMany({});
    await Client.insertMany(clientSeeds);
    console.log('Client DB seeded');
}

SeedDb().then(() => {
    mongoose.connection.close();
    console.log('Connection closed successfully');
});

    