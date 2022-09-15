const express = require('express');

const router = express.Router();

const franchiseRequestsCtrl = require('../controllers/franchiseRequests');

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a franchise request.
 *     tags: [FranchiseRequest]
 *     responses:
 *       201:
 *         description: Create a franchise request.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/'
 */
router.post('/', franchiseRequestsCtrl.addFranchiseRequest);

/**
 * @swagger
 * /accepted:
 *   get:
 *     summary: Retrieve every accepted franchise requests.
 *     tags: [FranchiseRequest]
 *     responses:
 *       200:
 *         description: The list of the accepted franchise requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Accepted'
 */
router.get('/accepted', franchiseRequestsCtrl.getAllAcceptedFranchiseRequests);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve a specific franchise request informations by id.
 *     tags: [FranchiseRequest]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The franchise request id.
 *     responses:
 *       200:
 *         description: Retrieve a specific franchise request informations by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/'
 *       404:
 *         description: The franchise request was not found
 */
router.get('/:id', franchiseRequestsCtrl.getFranchiseRequestDetail);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve every franchise requests.
 *     tags: [FranchiseRequest]
 *     responses:
 *       200:
 *         description: The list of all the franchise requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/'
 */
router.get('/', franchiseRequestsCtrl.getAllFranchiseRequests);

/**
 * @swagger
 * /delete/{id}:
 *   patch:
 *     summary: Archive a franchise request.
 *     tags: [FranchiseRequest]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The franchise request id.
 *     responses:
 *       200:
 *         description: Archive a franchise request.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/'
 *       404:
 *         description: The franchise request was not found
 */
router.patch('/delete/:id', franchiseRequestsCtrl.archiveFranchiseRequest);

/**
 * @swagger
 * /edit/{id}:
 *   patch:
 *     summary: Edit a franchise request status.
 *     tags: [FranchiseRequest]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The franchise request id.
 *     responses:
 *       200:
 *         description: Edit a franchise request status.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/'
 *       404:
 *         description: The franchise request was not found
 */
router.patch('/edit/:id', franchiseRequestsCtrl.editFranchiseRequest);

module.exports = router;
