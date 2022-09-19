const express = require('express');

const router = express.Router();

const franchiseRequestsCtrl = require('../controllers/franchiseRequests');

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
 *           description: The auto generate id of the franchise request.
 *         phone:
 *           type: string
 *           description: The given phone number related to the franchise request.
 *         city:
 *           type: number
 *           description: The city of the franchise request owner.
 *         estimatedAmount:
 *           type: number
 *           description: The estimated amount of money the owner of the franchise request can pay.
 *         hopedFinancing:
 *           type: string
 *           description: The hoped financing asked by the owner of the franchise request
 *         shopLocation:
 *           type: string
 *           description: The wanted location to create the new shop.
 *         foodServiceExperience:
 *           type: number
 *           description: The food service experience of the owner of the franchise request
 *         conditionOfUse:
 *           type: boolean
 *           description: The agreement of the condition of use.
 *         status:
 *           type: string
 *           description: The franchise request status.
 *         deletedAt:
 *           type: date
 *           description: The archiving date of the franchise request.
 *         user_id:
 *           type: objectid
 *           description: The id of the user who created the franchise request.
 *         updatedAt:
 *           type: date
 *           description: The updating date of the franchise request.
 *         createdAt:
 *           type: date
 *           description: The creation date of the franchise request.
 *       example:
 *         phone: 0666666633
 *         city: NANTES
 *         estimatedAmount: 66666
 *         hopedFinancing: 3333
 *         shopLocation: ABBEVILLE
 *         foodServiceExperience: 0
 *         conditionOfUse: true
 *         status: PENDING
 *         deleteAt: ''
 *         user_id: 63247760ae83ec3b10b9248f
 *         updatedAt: 2022-09-13T13:41:27.772Z
 *         createdAt: 2022-09-13T13:41:27.772Z
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
 *                 $ref: '#/components/schemas/FranchiseRequest'
 *       404:
 *          description: Aucune données n'a été trouvé.
 *       403:
 *          description: Impossible d'accéder à la liste demandée.
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
 *               $ref: '#/components/schemas/FranchiseRequest'
 *       404:
 *          description: Aucune données n'a été trouvé.
 *       403:
 *          description: Impossible d'accéder à la liste demandée.
 * /franchiseRequests/{id}:
 *   get:
 *     summary: Retrieve a specific franchise requests.
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
 *         description: The list of all the active franchise requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FranchiseRequest'
 *       404:
 *          description: Aucune données n'a été trouvé.
 *       403:
 *          description: Impossible d'accéder à la liste demandée.
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
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/FranchiseRequest'
 *     responses:
 *       200:
 *         description: Edit a franchise request status.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FranchiseRequest'
 *       404:
 *          description: Aucune données n'a été trouvé.
 *       403:
 *          description: Impossible d'accéder à la liste demandée.
 * /franchiseRequests/add:
 *   post:
 *     summary: Create a franchise request.
 *     tags: [FranchiseRequest]
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/FranchiseRequest'
 *     responses:
 *       201:
 *         description: Create a franchise request.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FranchiseRequest'
 *       400:
 *          description: La création de votre demande de franchise a échoué. Veuillez réessayer plus tard ou contacter l'assistance tehnique si l'erreur persiste.
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
 *                 $ref: '#/components/schemas/FranchiseRequest'
 *       404:
 *          description: Aucune données n'a été trouvé.
 *       403:
 *          description: Impossible d'accéder à la liste demandée.
 */

router.post('/add', franchiseRequestsCtrl.addFranchiseRequest);

router.get('/accepted', franchiseRequestsCtrl.getAllAcceptedFranchiseRequests);

router.get('/:id', franchiseRequestsCtrl.getFranchiseRequestDetail);

router.get('/', franchiseRequestsCtrl.getAllFranchiseRequests);

router.patch('/delete/:id', franchiseRequestsCtrl.archiveFranchiseRequest);

router.patch('/edit/:id', franchiseRequestsCtrl.editFranchiseRequest);

module.exports = router;
