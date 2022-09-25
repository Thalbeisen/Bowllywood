const express = require('express');

const router = express.Router();

const userController = require('../controllers/users');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - lastName
 *         - firstName
 *         - email
 *         - password
 *         - userValidationToken
 *         - userRole
 *       properties:
 *         lastName:
 *           type: string
 *           description: The last name provided by the user during registration process.
 *         firstName:
 *           type: string
 *           description: The first name provided by the user during the registration process.
 *         email:
 *           type: string
 *           description: The email address provided by the user during the registration process.
 *         password:
 *           type: string
 *           description: The password carefully chosen by the user during the registration phase.
 *         userValidationToken:
 *           type: string
 *           description: A secure random string created automatially during the registration process.
 *         userRole:
 *           type: number
 *           description: A user role set on the user account during the registration phase.
 *       example:
 *         lastName: Bond
 *         firstName: James
 *         email: jbond@mi6.co.uk
 *         password: Password1234!
 *         userValidationToken: f5ca778b-22bf-462d-b351-e34ea92a69a0
 *         userRole: ROLE_USER
 * /users:
 *   get:
 *     summary: Retrieve every user present in the database.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of every user present in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *          description: Aucune donnée n'a été trouvé.
 *       403:
 *          description: Vous n'avez pas accès à cette page.
 * /users/delete/{id}:
 *   patch:
 *     summary: Archive a user account.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user account id.
 *     responses:
 *       200:
 *         description: User account archived.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *          description: Aucune donnée n'a été trouvée.
 *       500:
 *          description: Une erreur serveur est survenue.
 * /users/{id}:
 *   get:
 *     summary: Retrieve a specific user.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id.
 *     responses:
 *       200:
 *         description: The user's infos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *          description: Aucun utilisateur n'a été trouvé.
 *       500:
 *          description: Une erreur serveur est survenue, veuillez réessayer ultérieurement.
 * /users/edit/{id}:
 *   patch:
 *     summary: Edit a user.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id.
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User edition successful.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *          description: Aucune donnée n'a été trouvée.
 *       500:
 *          description: Une erreur serveur est survenue, veuillez réessayer.
 * /users/add:
 *   post:
 *     summary: Create a new user.
 *     tags: [User]
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user has correctly been created.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *          description: La création de votre compte a échoué. Veuillez réessayer plus tard ou contacter l'assistance technique si l'erreur persiste.
 */

const auth = require('../middlewares/auth');

const { permit } = require('../middlewares/permissions');

// UNCOMMENT LINE BELOW ONCE LOGIN FEATURE READY
// router.get('/', auth, permit('ROLE_ADMIN'), userController.usersList);

// DELETE LINE BELOW ONCE LOGIN FEATURE READY
router.get('/', userController.usersList);

router.post('/add', userController.userNew);

router.get('/validate/:validationToken', userController.userValidate);

router.get('/:id', auth, userController.userDetails);

router.patch('/:id', auth, userController.userEdit);

router.post('/login', userController.userLogin);

router.post('/refresh', userController.refreshUserToken);

router.delete('/:id', auth, permit('ROLE_ADMIN'), userController.userDelete);

router.get(
    '/my-franchise-requests/:id',
    userController.getUserFranchiseRequests
);

module.exports = router;
