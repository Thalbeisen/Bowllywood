// requires
const express = require('express');

const router = express.Router();
const menuCtrl = require('../controllers/menu');

// middlewares
const auth = require('../middlewares/auth');

// set the routers for each methods
/**
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
 *           type: String,
 *           description: Nom du plat.
 *         category:
 *           type: String,
 *           description: Catégorie du plat (Salé ou sucré). Par défaut (salé).
 *         description:
 *           type: String,
 *           description: Description du plat.
 *         ingredients:
 *           type: Array,
 *           description: La Liste des id de ses ingrédients (depuis table Stock)
 *         allergens:
 *           type: Array,
 *           description: La Liste des id de ses allergens
 *         price:
 *           type: String,
 *           description: Prix fixé.
 *         image:
 *           type: String,
 *           description: Le chemin de son img de présentation
 *         createdBy:
 *           type: Schema.Types.ObjectId,
 *           description: Le nom de la personne l'ayant créé.
 *         lastUpdateBy:
 *           type: Schema.Types.ObjectId,
 *           description: Le nom de la dernière personne à l'avoir modifié.
 *       example:
 *         name: Tahiti
 *         description: Lorem ipsum description
 *         ingredients: [12, 7, 8, 23]
 *         allergens: [2]
 *         price: 17,50
 *         image: path/img_haiti.png
 */

 /**
  * @swagger
  * tags:
  *   name: Menu
  *   description: La liste des plats d'un menu.
  */

/**
 * @swagger
 * /Menu/create:
 *   post:
 *     summary: Create a meal
 *     tags: [Menu/create]
 *     responses:
 *       200:
 *         description: The created meal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 *       400:
 *         description: Une erreur a été cacthée. 
 */
router.post('/create', menuCtrl.createMeal);

/**
 * @swagger
 * /Menu/create:
 *   post:
 *     summary: Create a meal
 *     tags: [Menu/create]
 *     responses:
 *       200:
 *         description: The created meal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 */
router.post('/update/:id', auth, menuCtrl.updateMeal);

/**
 * @swagger
 * /Menu/create:
 *   post:
 *     summary: Create a meal
 *     tags: [Menu/create]
 *     responses:
 *       200:
 *         description: The created meal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 */
router.delete('/delete/:id', auth, menuCtrl.deleteMeal);

/**
 * @swagger
 * /Menu/create:
 *   post:
 *     summary: Create a meal
 *     tags: [Menu/create]
 *     responses:
 *       200:
 *         description: The created meal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 */
router.get('/:id', menuCtrl.getOneMeal);

/**
 * @swagger
 * /Menu/create:
 *   post:
 *     summary: Create a meal
 *     tags: [Menu/create]
 *     responses:
 *       200:
 *         description: The created meal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 */
router.get('/', menuCtrl.getAllMenu);

module.exports = router;
