// trips router
const express = require('express');
const router = express.Router({mergeParams: true});
const {show, index, create, put, deleteTrip} = require('../../controllers/trip');


router.route('/')
    .get(index)
    .post(create)

router.route('/:id')
    .get(show)
    .put(put)
    .delete(deleteTrip)


module.exports = router;

