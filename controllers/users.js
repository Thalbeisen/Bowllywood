// J'importe mon .env
require('dotenv').config();

// J'importe bcrypt pour hasher mes mots de passe et paramètre le nombre de passes
const bcrypt = require('bcrypt');

const saltRounds = 10;

// J'importe JWT pour générer mes jetons d'authentification
const jwt = require('jsonwebtoken');

// J'importe mon modèle Users
const User = require('../models/users');

const generateToken = (payload, secret, ttl) =>
    jwt.sign(payload, secret, { expiresIn: ttl });

/**
 * Méthode de récupération des utilisateurs
 * @param {Request} req
 * @param {Response} res
 */
exports.usersList = async (req, res) => {
    try {
        const users = await User.find({});

        if (!users) {
            res.status(404).json({
                message: 'Aucun utilisateur trouvé',
            });
        }
        const listObject = JSON.parse(JSON.stringify(users));
        delete listObject.password;
        res.status(200).send({
            data: listObject,
        });
    } catch (err) {
        res.status(500).json({
            err,
        });
    }
};

/**
 * Méthode pour récupérer les détails d'un utilisateur en fonction d'un id donné
 * @param {Request} req
 * @param {Response} res
 */
exports.userDetails = async (req, res) => {
    try {
        const filterUser = { _id: req.params.id };
        const userDetails = await User.findOne(filterUser);

        if (!userDetails) {
            res.status(404).json({
                message: "Aucun utilisateur pour l'id donné",
            });
        }

        res.status(200).send({
            data: userDetails,
        });
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};

/**
 * Méthode d'édition de l'utilisateur
 * @param {Request} req
 * @param {Response} res
 */
exports.userEdit = async (req, res) => {
    try {
        const selectedUser = await User.findOne({ _id: req.params.id });

        if (!selectedUser) {
            res.status(404).json({
                message: "Aucun utilisateur pour l'id donné",
            });
        }

        await User.updateOne({ _id: req.params.id }, { ...req.body });
        const updatedUser = await User.findOne(
            { _id: req.params.id },
            { password: 0, createdAt: 0, __v: 0 }
        );
        res.status(200).json({
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
};

/**
 * Méthode pour créer un utilisateur utilisant bcrypt hash
 * @param {Request} req
 * @param {Response} res
 */
exports.userNew = async (req, res) => {
    try {
        const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
        const user = new User({ ...req.body, password: passwordHash });
        const createdUser = await user.save();
        const userObject = JSON.parse(JSON.stringify(createdUser));
        delete userObject.password;
        res.status(201).json(userObject);
    } catch (err) {
        res.status(400).json({
            message: "L'utilisateur existe déjà",
        });
    }
};

/**
 * Méthode pour connecter un utilisateur avec son email/password
 * @param {Request} req
 * @param {Response} res
 */
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec();

        if (!user) {
            const error = new Error('Identifiant/Mot de passe incorrect');
            error.code = 422;
            throw error;
        }
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            const error = new Error('Identifiant/Mot de passe incorrect');
            error.code = 422;
            throw error;
        }
        /* eslint-disable no-underscore-dangle */
        const token = generateToken(
            { id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            '10m'
        );
        /* eslint-disable no-underscore-dangle */
        const refreshToken = generateToken(
            { id: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            '7h'
        );
        res.status(200).json({
            token,
            refreshToken,
        });
    } catch (err) {
        const code = err.code ?? 500;
        res.status(code).json({
            message: err.message,
        });
    }
};

/**
 * Méthode pour rafraîchir un jeton d'authentification
 * @param {Request} req
 * @param {Response} res
 */
exports.refreshUserToken = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const authToken = authHeader && authHeader.split(' ')[1];
        if (!authToken) {
            const error = new Error('Unauthorized');
            error.code = 401;
            throw error;
        }
        const user = await jwt.verify(
            authToken,
            process.env.REFRESH_TOKEN_SECRET
        );
        delete user.iat;
        delete user.exp;
        const token = generateToken(
            user,
            process.env.ACCESS_TOKEN_SECRET,
            '10m'
        );
        const refreshToken = generateToken(
            user,
            process.env.REFRESH_TOKEN_SECRET,
            '7h'
        );
        res.status(200).json({
            token,
            refreshToken,
        });
    } catch (err) {
        res.status(500).json({
            err,
        });
    }
};

// Méthode de suppression utilisant la méthode findOne pour s'assurer que l'id donné existe, et la méthode findOneAndDelete pour supprimer le document
exports.userDelete = async (req, res) => {
    try {
        const selectedUser = await User.findOne({ _id: req.params.id });

        if (!selectedUser) {
            res.status(404).json({
                message: "Aucun utilisateur trouvé pour l'id donné",
            });
        }
        await User.findOneAndDelete({
            _id: req.params.id,
        });
        res.status(200).json({
            message: 'Utilisateur supprimé avec succès',
        });
    } catch (err) {
        res.status(500).json({
            err,
        });
    }
};
