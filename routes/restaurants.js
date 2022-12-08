const express = require('express');

const auth = require('../middlewares/auth');

const router = express.Router();

const restaurantCtrl = require('../controllers/restaurants');

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       required:
 *         - adress
 *         - phone
 *         - latitude
 *         - longitude
 *         - pmrAccess
 *         - city
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto generate id of the restaurant.
 *         adress:
 *           type: string
 *           description: The restaurant's adress.
 *         sundayOpeningTime:
 *           type: number
 *           description: The sunday opening time.
 *         sundayClosingTime:
 *           type: number
 *           description: The sunday closing time.
 *         mondayOpeningTime:
 *           type: string
 *           description: The monday opening time.
 *         mondayClosingTime:
 *           type: string
 *           description: The monday closing time.
 *         tuesdayOpeningTime:
 *           type: number
 *           description: The tuesday opening time.
 *         tuesdayClosingTime:
 *           type: boolean
 *           description: The tuesday closing time.
 *         wednesdayOpeningTime:
 *           type: string
 *           description: The wednesday opening time.
 *         wednesdayClosingTime:
 *           type: string
 *           description: The wednesday closing time.
 *         thursdayOpeningTime:
 *           type: string
 *           description: The thursday opening time.
 *         thursdayClosingTime:
 *           type: string
 *           description: The thursday closing time.
 *         fridayOpeningTime:
 *           type: string
 *           description: The friday opening time.
 *         fridayClosingTime:
 *           type: string
 *           description: The friday closing time.
 *         saturdayOpeningTime:
 *           type: string
 *           description: The saturday opening time.
 *         saturdayClosingTime:
 *           type: string
 *           description: The saturday closing time.
 *         phone:
 *           type: string
 *           description: The restaurant's phone.
 *         facilities:
 *           type: string
 *           description: The restaurant's facilities level.
 *         latitude:
 *           type: string
 *           description: The restaurant latitude.
 *         longitude:
 *           type: string
 *           description: The restaurant longitude.
 *         pmrAccess:
 *           type: string
 *           description: The restaurant's pmr access.
 *         city:
 *           type: string
 *           description: The restaurant's city.
 *         deletedAt:
 *           type: date
 *           description: The archiving date of the restaurant.
 *         updatedAt:
 *           type: date
 *           description: The updating date of the restaurant.
 *         createdAt:
 *           type: date
 *           description: The creation date of the restaurant.
 *       example:
 *         adress: 33 Place du Capitole
 *         sundayOpeningTime: Fermé
 *         sundayClosingTime: Fermé
 *         mondayOpeningTime: 11h
 *         mondayClosingTime: 23h
 *         tuesdayOpeningTime: 11h
 *         tuesdayClosingTime: 23h
 *         wednesdayOpeningTime: 11h
 *         wednesdayClosingTime: 23h
 *         thursdayOpeningTime: 11h
 *         thursdayClosingTime: 23h
 *         fridayOpeningTime: 14h
 *         fridayClosingTime: 20h
 *         saturdayOpeningTime: 14h
 *         saturdayClosingTime: 20h
 *         phone: 0612345678
 *         facilities: BASIC
 *         latitude: 6.66
 *         longitude: 6.6
 *         pmrAccess: true
 *         city: Toulouse
 *         deleteAt: ''
 *         updatedAt: 2022-09-13T13:41:27.772Z
 *         createdAt: 2022-09-13T13:41:27.772Z
 * /restaurants/city/{city}:
 *   get:
 *     summary: Retrieve all restaurant from the given city.
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: The restaurant city.
 *     responses:
 *       200:
 *         description: The list of all restaurants from the selected city.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       404:
 *          description: Aucune données n'a été trouvé.
 *       403:
 *          description: Impossible d'accéder à la liste demandée.
 * /restaurants/delete/{id}:
 *   patch:
 *     summary: Archive a restaurant.
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The restaurant id.
 *     responses:
 *       200:
 *         description: Archive a restaurant.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *          description: Aucune données n'a été trouvé.
 *       403:
 *          description: Impossible d'accéder à la liste demandée.
 * /restaurants/{id}:
 *   get:
 *     summary: Retrieve a specific restaurant.
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The restaurant id.
 *     responses:
 *       200:
 *         description: The list of all active restaurants.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       404:
 *          description: Aucune données n'a été trouvé.
 *       403:
 *          description: Impossible d'accéder à la liste demandée.
 * /restaurants/edit/{id}:
 *   patch:
 *     summary: Edit a restaurant.
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The restaurant id.
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       200:
 *         description: Edit a restaurant.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *          description: Aucune données n'a été trouvé.
 *       403:
 *          description: Impossible d'accéder à la liste demandée.
 * /restaurants/add:
 *   post:
 *     summary: Create a restaurant.
 *     tags: [Restaurant]
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: Create a restaurant.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       400:
 *          description: La création du restaurant a échoué. Veuillez réessayer plus tard ou contacter l'assistance tehnique si l'erreur persiste.
 * /restaurants/:
 *   get:
 *     summary: Retrieve every restaurants.
 *     tags: [Restaurant]
 *     responses:
 *       200:
 *         description: The list of all restaurants.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       404:
 *          description: Aucune données n'a été trouvé.
 *       403:
 *          description: Impossible d'accéder à la liste demandée.
 */

router.post('/add', auth, restaurantCtrl.addRestaurant);

router.get('/city/:city', restaurantCtrl.filterRestaurantFromCity);

router.get('/:id', restaurantCtrl.getRestaurantDetail);

router.get('/', restaurantCtrl.getAllRestaurants);

router.patch('/edit/:id', auth, restaurantCtrl.editRestaurant);

router.patch('/delete/:id', auth, restaurantCtrl.archiveRestaurant);

module.exports = router;
