/** API Documentation
 * @swagger
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       required:
 *         - text
 *         - category
 *       properties:
 *         text:
 *           type: string,
 *           description: Nom de l'ingrédient.
 *         category:
 *           type: array,
 *           description: Catégorie de l'ingrédient (Salé et/ou sucré).
 *       example:
 *         name: Riz
 *         category: ['SALE']
 *
 * tags:
 *   name: Ingredient
 *   description: Les ingrédient d'un bowl
 *
 * /ingredient/{id}:
 *   get:
 *     summary: Get one ingredient informations
 *     tags: [Ingredient]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ingredient id
 *     responses:
 *       200:
 *         description: The ingredient description
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ingredient'
 *       404:
 *         description: The ingredient was not found.
 *       500:
 *         description: Some server error.
 *
 * /ingredients:
 *   get:
 *     summary: Get all ingredient
 *     tags: [Ingredient]
 *     responses:
 *       200:
 *         description: All ingredient
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

const router = express.Router();
const ingredientCtrl = require('../controllers/ingredient');

router.get('/:id', ingredientCtrl.getOneIngredient);
router.get('/:cat', ingredientCtrl.getAllIngredients);

module.exports = router;
