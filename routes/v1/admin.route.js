const express = require('express');
const router = express.Router({ mergeParams: true });
const { show, index, create, put, deleteTrip } = require('../../controllers/trip');
const multer = require('multer');
const { storage } = require('../../services/cloudinary');
const swaggerJSDoc = require('swagger-jsdoc');
const { isLogged, isAdmin, isSuperAdmin } = require('../../middlewares/userManagment');
const { getAdmins, createAdmin, showAdmin, deleteAdmin, updateAdmin, login } = require('../../controllers/admin');
const {validateTrip, validateAdmin} = require('../../middlewares/validations');
const upload = multer({ storage });

router.route('/trips')
    .get(isLogged,isAdmin,index)
    .post(isLogged, isAdmin, upload.array("image"), validateTrip, create)

router.route('/trips/:id')
    .get(isLogged,isAdmin, show)
    .put(isLogged,isAdmin, put)
    .delete(isLogged,isAdmin, deleteTrip)

router.route('/admins')
    .get(isLogged,isAdmin, getAdmins)
    .post(isLogged, isSuperAdmin,validateAdmin, createAdmin)

router.route('/admins/:id')
    .get(isLogged,isAdmin, showAdmin)
    .delete(isLogged, isSuperAdmin, deleteAdmin)
    .put(isLogged, isSuperAdmin, updateAdmin)


router.route('/login')
    .post(isLogged, login)


module.exports = router;

/** 
 * @swagger
 * components:
 *  schemas:
 *     Admin:
 *      type: object
 *      required:
 *       - name
 *       - email
 *       - password
 *       - role
 *      properties:
 *       name:
 *        type: string
 *       email:
 *        type: string
 *       password:
 *        type: string
 *       role:
 *        type: string
 *        enum:
 *         - admin
 *         - superAdmin
 *      example:
 *       name: admin
 *       email: admin@gmail.com
 *       password: admin123
 *       role: admin
 */
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
 *       401:
 *         description: Unauthorized
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
 *       401:
 *         description: Unauthorized
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
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The trip was not found
 *   put:
 *     summary: Edit the trip by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The trip id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Trip"
 *     responses:
 *       200:
 *         description: Trip updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Trip"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The trip was not found
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Remove the trip by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The trip id
 *     description: The trip id
 *     responses:
 *       200:
 *         description: The trip was deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Trip"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The trip was not found
 *       500:
 *         description: Some server error
 * 
 * admin/admins:
 *   get:
 *     summary: Returns the list of all admins
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: The list of the admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Admin"
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: "#/components/schemas/Admin"
 *     responses:
 *       200:
 *         description: The created admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Admin"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 * admin/admins/{id}:
 *   get:
 *     summary: Get the admin by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin id
 *     responses:
 *       200:
 *         description: The admin by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Admin"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The admin was not found
 *   put:
 *     summary: Edit the admin by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Admin"
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Admin"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The admin was not found
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Remove the admin by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin id
 *     description: The admin id
 *     responses:
 *       200:
 *         description: The admin was deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Admin"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: The admin was not found
 *       500:
 *         description: Some server error
*/ 