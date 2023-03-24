/** API Documentation
 * @swagger
 * components:
 *   schemas:
 *     Bowl:
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
 *   name: Bowl
 *   description: La liste des plats d'un menu.
 *
 * /menu/create:
 *   post:
 *     summary: Create a meal
 *     tags: [Bowl]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             items:
 *               $ref: '#/components/schemas/Bowl'
 *     responses:
 *       201:
 *         description: The meal was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 type: array
 *                 $ref: '#/components/schemas/Bowl'
 *       404:
 *         description: If the creation has failed.
 *       400:
 *         description: Some server error.
 *
 * /menu/update/{id}:
 *   post:
 *     summary: Update a meal
 *     tags: [Bowl]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               $ref: '#/components/schemas/Bowl'
 *     responses:
 *       200:
 *         description: The updated meal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Bowl'
 *       404:
 *         description: Request error.
 *       500:
 *         description: Some server error.
 *
 * /menu/delete/{id}:
 *   delete:
 *     summary: Delete a meal by id
 *     tags: [Bowl]
 *     parameters:
 *       - in: path
 *         name: id
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
 *     tags: [Bowl]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               $ref: '#/components/schemas/Bowl'
 *       404:
 *         description: The meal was not found.
 *       500:
 *         description: Some server error.
 *
 * /menu:
 *   get:
 *     summary: Get the menu
 *     tags: [Bowl]
 *     responses:
 *       200:
 *         description: The menu (list of meals)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Bowl'
 *       404:
 *         description: The list is empty.
 *       500:
 *         description: Some server error.
 */

// requires
const express = require('express');
const menuCtrl = require('../controllers/menu');

const router = express.Router();

// middlewares
const auth = require('../middlewares/auth'),
    { permit } = require('../middlewares/permissions');

// set the routers for each methods
router.get('/adminlist', 
            auth, 
            permit('ROLE_WAITER', 
                'ROLE_COOK', 
                'ROLE_MANAGER',
                'ROLE_CEO',
                'ROLE_ADMIN',
                'ROLE_SUPERADMIN'), 
            menuCtrl.getAllBowls);
router.get('/:id', menuCtrl.getOneMeal);
router.post('/update/:id', auth, permit('ROLE_ADMIN'), menuCtrl.updateMeal);
router.post('/create', auth,permit('ROLE_ADMIN'), menuCtrl.createMeal);
router.delete('/delete/:id', auth,permit('ROLE_ADMIN'), menuCtrl.deleteMeal);
router.get('/desserts', menuCtrl.getSweetBowls);
router.get('/', menuCtrl.getSaltedBowls);

module.exports = router;
