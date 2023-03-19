/** API Documentation
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - userID
 *         - franchisedID
 *         - mark
 *       properties:
 *         userID:
 *             type: string,
 *             description: The review's owner.
 *         franchisedID:
 *             type: number,
 *             description: The concerned restaurant.
 *         mark:
 *             type: number,
 *             description: The mark, from 1 to 5.
 *         comment:
 *             type: string,
 *             description: The text comment itself. Min length 2, max length 255.
 *         deletedAt:
 *             type: date,
 *             description: The deletion date.
 *       example:
 *         userID: 63233dea610f1f4b73a99a8d
 *         franchisedID: 2
 *         mark: 3
 *         comment: Comment ipsum dolor sit amet
 *
 * tags:
 *   name: Review
 *   description: Tous les avis des clients sur les restaurants.
 *
 * /review/create:
 *   post:
 *     summary: Create a new review
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             items:
 *               $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: The review was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: If the creation has failed.
 *       400:
 *         description: Some server error.
 *
 * /review/update/{review}:
 *   post:
 *     summary: Update a review
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: review
 *         schema:
 *           type: string
 *           ref: User
 *         required: true
 *         description: The review id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             items:
 *               $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: The updated review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: Request error.
 *       500:
 *         description: Some server error.
 *
 * /review/delete/{review}:
 *   patch:
 *     summary: Delete/archive a review by feeding deletedAt column.
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: review
 *         schema:
 *           type: string
 *         required: true
 *         description: The review id
 *     responses:
 *       200:
 *         description: The review was deleted.
 *       403:
 *         description: Can't access to the deletion bc the item is already deleted.
 *       404:
 *         description: Request error.
 *       500:
 *         description: Some server error.
 * /review:
 *   get:
 *     summary: Get all the review
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: The list of reviews.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: The list is empty.
 *       500:
 *         description: Some server error.
 */

// requires
const express = require('express');

const router = express.Router();
const reviewCtrl = require('../controllers/review');

// middlewares
const auth = require('../middlewares/auth');

// set the routers for each action/methods
router.post('/create', auth, permit('ROLE_USER'), reviewCtrl.createReview);
router.post('/update/:id', auth, reviewCtrl.updateReview); // garder ?
router.patch('/delete/:id', auth, permit('ROLE_USER'), reviewCtrl.deleteReview); // + celui qui a créée
router.get('/', reviewCtrl.getAllReview);

module.exports = router;
