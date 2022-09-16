// requires
const express = require('express');

const router = express.Router();
const menuCtrl = require('../controllers/menu');

// middlewares
const auth = require('../middlewares/auth');

// set the routers for each methods

/**
 * @swagger
 * 
 */
router.post('/create', auth, menuCtrl.createMeal);

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
