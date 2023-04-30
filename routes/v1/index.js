const express = require('express');
const tripRouter = require('./trip.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/trips',
        route: tripRouter,
    },
];

router.get('/', (req, res) => {
    res.status(200).send('Welcome to the Trip API V1 Home Page');
});

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
