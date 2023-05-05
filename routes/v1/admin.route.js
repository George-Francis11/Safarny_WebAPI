const express = require('express');
const router = express.Router({ mergeParams: true });
const { show, index, create, put, deleteTrip } = require('../../controllers/trip');
const multer = require('multer');
const { storage } = require('../../services/cloudinary');
const swaggerJSDoc = require('swagger-jsdoc');
const upload = multer({ storage });

router.route('/')
    .get(index)
    .post(upload.array("image"), create)

router.route('/:id')
    .get(show)
    .put(put)
    .delete(deleteTrip)


module.exports = router;

/** 
 * @swagger
 * tags:
 *   name: Admin
 *   description: The Admin panel API
 * admin/trips:
 *   get:
 *     summary: Returns the list of all the trips
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: season
 *         schema:
 *           type: string
 *           enum: 
 *             - summer
 *             - winter
 *             - spring
 *         required: true
 *         description: The season of the trips needed. must be one of the following [summer, winter]
 *     responses:
 *       200:
 *         description: The list of the trips
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Trip"
 *   post:
 *     summary: Create a new trip
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Trip"
 *     responses:
 *       200:
 *         description: The created trip
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Trip"
 * 
 *       500:
 *         description: Some server error
 * admin/trips/{id}:
 *   get:
 *     summary: Get the trip by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The trip id
 *     responses:
 *       200:
 *         description: The trip description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Trip"
 *       404:
 *         description: The trip was not found
*/ 