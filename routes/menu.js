/** API Documentation
 * @swagger
 * components:
 *   schemas:
 *     Menu:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *         - image
 *         - createdBy
 *       properties:
 *         name:
 *           type: string,
 *           description: Nom du plat.
 *         category:
 *           type: string,
 *           description: Catégorie du plat (Salé ou sucré). Par défaut (salé).
 *         description:
 *           type: string,
 *           description: Description du plat.
 *         ingredients:
 *           type: Array,
 *           description: La Liste des id de ses ingrédients (depuis table Stock).
 *         allergens:
 *           type: Array,
 *           description: La Liste des id de ses allergens
 *         price:
 *           type: string,
 *           description: Prix fixé.
 *         image:
 *           type: string,
 *           description: Le chemin de son img de présentation
 *         createdBy:
 *           type: string,
 *           description: Le nom de la personne l'ayant créé.
 *         lastUpdateBy:
 *           type: string,
 *           description: Le nom de la dernière personne à l'avoir modifié.
 *       example:
 *         name: Tahiti
 *         category: SALE
 *         description: Lorem ipsum description
 *         ingredients: [12, 7, 8, 23]
 *         allergens: [2]
 *         price: 17,50
 *         image: path/img_haiti.png
 *
 * tags:
 *   name: Menu
 *   description: La liste des plats d'un menu.
 *
 * /menu/create:
 *   post:
 *     summary: Create a meal
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             items:
 *               $ref: '#/components/schemas/Menu'
 *     responses:
 *       201:
 *         description: The meal was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: array
 *                 $ref: '#/components/schemas/Menu'
 *       404:
 *         description: If the creation has failed.
 *       400:
 *         description: Some server error.
 *
 * /menu/update/{id}:
 *   post:
 *     summary: Update a meal
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: Enter the meal id
 *         schema:
 *           type: string
 *         required: true
 *         description: The meal id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             items:
 *               $ref: '#/components/schemas/Menu'
 *     responses:
 *       200:
 *         description: The updated meal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Request error.
 *       500:
 *         description: Some server error.
 *
 * /menu/delete/{id}:
 *   delete:
 *     summary: Delete a meal by id
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: Enter the meal id
 *         schema:
 *           type: string
 *         required: true
 *         description: The meal id
 *     responses:
 *       200:
 *         description: The meal was deleted.
 *       404:
 *         description: Request error.
 *       500:
 *         description: Some server error.
 *
 * /menu/{id}:
 *   get:
 *     summary: Get one meal informations
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: Enter the meal id
 *         schema:
 *           type: string
 *         required: true
 *         description: The meal id
 *     responses:
 *       200:
 *         description: The meal description
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       404:
 *         description: The meal was not found.
 *       500:
 *         description: Some server error.
 *
 * /menu:
 *   get:
 *     summary: Get the menu
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: The menu (list of meals)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 *       404:
 *         description: The list is empty.
 *       500:
 *         description: Some server error.
 */

// requires
const express = require('express');

const router = express.Router();
const menuCtrl = require('../controllers/menu');

// middlewares
const auth = require('../middlewares/auth');

// set the routers for each methods
router.post('/create', menuCtrl.createMeal); // auth,
router.post('/update/:id', menuCtrl.updateMeal); // auth,
router.delete('/delete/:id', menuCtrl.deleteMeal); // auth,
router.get('/:id', menuCtrl.getOneMeal);
router.get('/', menuCtrl.getAllMenu);

module.exports = router;
