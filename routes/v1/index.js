const express = require('express');
const tripRouter = require('./trip.route');
const adminRouter = require('./admin.route');
const oauthRouter = require('../../OAuth/oauth.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/trips',
        route: tripRouter,
    },
    {
        path: '/admin',
        route: adminRouter,
    },
    {
        path: '/authenticate',
        route: oauthRouter,
    },
];

router.get('/', (req, res) => {
    res.status(200).send('Welcome to the Trip API V1 Home Page');
});

router.use('/test', (req, res) => {
    // log the method and the body
    console.log(req.method, req.body);
    res.status(200).send('Welcome to the Trip API V1 test Page');
});

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
