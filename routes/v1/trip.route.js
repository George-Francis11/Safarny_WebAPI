// trips router
const express = require('express');
const router = express.Router({mergeParams: true});
const { show, index, create, put, deleteTrip } = require('../../controllers/trip');
const multer = require('multer');
const { storage } = require('../../services/cloudinary');
const upload = multer({ storage });



router.route('/')
    .get(index)
    .post(upload.array("image"),create)

router.route('/:id')
    .get(show)
    .put(put)
    .delete(deleteTrip)


module.exports = router;

