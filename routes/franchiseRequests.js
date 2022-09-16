const express = require('express');

const router = express.Router();

const franchiseRequestsCtrl = require('../controllers/franchiseRequests');

/**
 * @swagger
 * /franchiseRequests/:
 *   post:
 *     summary: Create a franchise request.
 *     tags: [FranchiseRequest]
 *     requestBody:
 *      content:
 *          schema:
 *              $ref: '#/components/schemas/'
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
 * /franchiseRequests/accepted:
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
 * components:
 *   schemas:
 *     FranchiseRequest:
 *       type: object
 *       required:
 *         - phone
 *         - city
 *         - estimatedAmount
 *         - hopedFinancing
 *         - shopLocation
 *         - foodServiceExperience
 *         - conditionOfUse
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto generate id of the franchise request
 *         phone:
 *           type: string
 *           description: The auto generate id of the franchise request
 *         city:
 *           type: number
 *           description: The auto generate id of the franchise request
 *         estimatedAmount:
 *           type: number
 *           description: The auto generate id of the franchise request
 *         hopedFinancing:
 *           type: string
 *           description: The auto generate id of the franchise request
 *         shopLocation:
 *           type: string
 *           description: The auto generate id of the franchise request
 *         foodServiceExperience:
 *           type: number
 *           description: The auto generate id of the franchise request
 *         conditionOfUse:
 *           type: boolean
 *           description: The auto generate id of the franchise request
 *         status:
 *           type: string
 *           description: The auto generate id of the franchise request
 *         deletedAt:
 *           type: date
 *           description: The auto generate id of the franchise request
 *         user_id:
 *           type: string
 *           description: The auto generate id of the franchise request
 *         updatedAt:
 *           type: date
 *           description: The auto generate id of the franchise request
 *         createdAt:
 *           type: date
 *           description: The auto generate id of the franchise request
 *       example:
 *         _id: d5fe4asz
 *         phone: 0666666633
 *         city: Alexander K. Dewdney
 *         estimatedAmount: 66666
 *         hopedFinancing: 3333
 *         shopLocation: TEST
 *         foodServiceExperience: 0
 *         conditionOfUse: true
 *         status: PENDING
 *         deleteAt: ''
 *         user_id: d24g6f4r5
 *         updatedAt: 2022-09-13T13:41:27.772Z
 *         createdAt: 2022-09-13T13:41:27.772Z
 * /franchiseRequests/{id}:
 *   get:
 *     summary: Retrieve every franchise requests.
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
 *         description: The list of all the franchise requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/'
 */

router.get('/:id', franchiseRequestsCtrl.getFranchiseRequestDetail);

/**
 * @swagger
 * /franchiseRequests/:
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
 * /franchiseRequests/delete/{id}:
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
 * /franchiseRequests/edit/{id}:
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
