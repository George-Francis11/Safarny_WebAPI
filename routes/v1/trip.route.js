// trips router
const express = require('express');
const router = express.Router({mergeParams: true});
const { show, index } = require('../../controllers/trip');
const swaggerJSDoc = require('swagger-jsdoc');
const { isLogged } = require('../../middlewares/userManagment');




router.route('/')
    .get(isLogged,index)

router.route('/:id')
    .get(isLogged,show)

module.exports = router;


/**
 * @swagger
 * components:
 *  schemas:
 *     Trip:
 *      type: object
 *      required:
 *       - name
 *       - location
 *       - description
 *       - airfare
 *       - hotel
 *       - car_rental
 *       - food
 *       - activities
 *       - base_expenses
 *       - total_per_day
 *       - currency
 *       - food_cuisine
 *       - season
 *       - geometry
 *       - images
 *      properties:
 *       name:
 *        type: string
 *       location:
 *        type: string
 *       description:
 *        type: string
 *       airfare:
 *        type: number
 *       hotel:
 *        type: number
 *       car_rental:
 *        type: number
 *       food:
 *        type: number
 *       activities:
 *        type: number
 *       base_expenses:
 *        type: number
 *       total_per_day:
 *        type: number
 *       currency:
 *        type: string
 *       food_cuisine:
 *        type: string
 *       season:
 *        type: string
 *       geometry:
 *        type: object
 *        properties:
 *         type:
 *          type: string
 *         coordinates:
 *          type: string
 *        example:
 *         type: Point
 *         coordinates: [30.0444, 31.2357]
 *       images:
 *        type: array
 *        items:
 *         type: object
 *         properties:
 *          url:
 *           type: string
 *          filename:
 *           type: string
 *      example:
 *       name: Trip to Alexandria
 *       location: Alexandria, Egypt
 *       description: Trip to Alexandria
 *       airfare: 200
 *       hotel: 50
 *       car_rental: 10
 *       food: 50
 *       activities: 50
 *       base_expenses: 200
 *       total_per_day: 160
 *       currency: EGP
 *       food_cuisine: Egyptian
 *       season: Winter
 *       geometry:
 *        type: Point
 *        coordinates: [30.0444, 31.2357]
 *       images:
 *        - url: https://res.cloudinary.com/dxkufsejm/image/upload/v1620829856/YelpCamp/ahxqjzqjxqjxqjxqjxqj.jpg
 *          filename: YelpCamp/ahxqjzqjxqjxqjxqjxqj
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
 *   
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

