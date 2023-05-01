// trips router
const express = require('express');
const router = express.Router({mergeParams: true});
const { show, index, create, put, deleteTrip } = require('../../controllers/trip');
const multer = require('multer');
const { storage } = require('../../services/cloudinary');
const swaggerJSDoc = require('swagger-jsdoc');
const upload = multer({ storage });



router.route('/')
    .get(index)
    .post(upload.array("image"),create)

router.route('/:id')
    .get(show)
    .put(put)
    .delete(deleteTrip)


module.exports = router;


/**
 * @swagger
 * components:
 *  schemas:
 *     Trip:
 *      type: object
 *      required:
 *       - name
 *       - description
 *       - price
 *      properties:
 *       name:
 *        type: string
 *       description:
 *        type: string
 *       price:
 *        type: number
 *      example:
 *       name: Trip to Cairo
 *       description: Trip to Cairo
 *       price: 100
 */


/** 
 * @swagger
 * tags:
 *   name: Trips
 *   description: The trips managing API
 * /trips:
 *   get:
 *     summary: Returns the list of all the trips
 *     tags: [Trips]
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
 *     tags: [Trips]
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
 * /trips/{id}:
 *   get:
 *     summary: Get the trip by id
 *     tags: [Trips]
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

