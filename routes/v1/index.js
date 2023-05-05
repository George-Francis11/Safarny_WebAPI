const express = require('express');
const tripRouter = require('./trip.route');
const adminRouter = require('./admin.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/trips',
        route: tripRouter,
    },
    {
        path: '/admin',
        route: adminRouter,
    }
];

router.get('/', (req, res) => {
    res.status(200).send('Welcome to the Trip API V1 Home Page');
});

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
