// J'importe mon .env
require('dotenv').config();

// J'importe bcrypt pour hasher mes mots de passe et paramètre le nombre de passes
const bcrypt = require('bcrypt');

const saltRounds = 10;

// J'importe JWT pour générer mes jetons d'authentification
const jwt = require('jsonwebtoken');

// J'importe Nodemailer pour le mail de vérification
const nodemailer = require('nodemailer');

// J'importe fs
const fs = require('fs');
const path = require('path');

// J'importe Handlebars pour mes mails
const handlebars = require('handlebars');

handlebars.registerHelper(
    'link',
    (text, url) =>
        new handlebars.SafeString(
            `<a href='${url}' class="validateButton">${text}</a>`
        )
);

const mailValidateTemplate = fs.readFileSync(
    path.join(__dirname, '../assets/handlebarsTemplates/mailValidate.hbs'),
    'utf8'
);

const mailTemplate = handlebars.compile(mailValidateTemplate);

// J'importe le  package uuidv4 pour générer un uuid aléatoire
const { v4: uuidv4 } = require('uuid');

// J'importe mon modèle users
const User = require('../models/users');

// Je déclare un transporter pour pouvoir envoyer les mails
const transporter = nodemailer.createTransport({
    service: 'Mailtrap',
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

transporter.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Nodemailer Transport Ready!');
    }
});

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
        const uniqueString = uuidv4();
        const user = new User({
            ...req.body,
            password: passwordHash,
            userValidationToken: uniqueString,
        });
        const createdUser = await user.save();
        /* eslint-disable no-underscore-dangle */
        const validationToken = generateToken(
            { id: user._id, token: uniqueString },
            process.env.VALIDATE_TOKEN_SECRET,
            '1d'
        );
        /* eslint-disable no-use-before-define */
        sendEmailValidation(user, validationToken);
        const userObject = JSON.parse(JSON.stringify(createdUser));
        delete userObject.password;
        delete userObject.userValidationToken;
        res.status(201).json(userObject);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err,
        });
    }
};

const sendEmailValidation = async (user, validationToken, res) => {
    const mailHtml = mailTemplate({
        url: `https://bowllywood.onrender.com/users/validate/${validationToken}`,
        // url: `http://localhost:6000/users/validate/${validationToken}`,
    });
    const mailContent = {
        from: 'admin@bollywood.fr',
        to: user.email,
        subject: 'Bowllywood - Vérification de ton email',
        attachment: [
            {
                filename: 'Bowllywood.png',
                path: path.join(
                    'https://img2.freepng.fr/20180417/vrq/kisspng-tiki-bar-cuisine-of-hawaii-hawaiian-mask-5ad5ad26034541.3539464215239529340134.jpg'
                ),
                cid: 'Bowllywood',
            },
        ],
        html: mailHtml,
    };
    await transporter.sendMail(mailContent).catch((err) => {
        res.status().json({
            message: err,
        });
    });
};
exports.userValidate = async (req, res) => {
    try {
        const providedToken = req.params.validationToken;
        const decodedToken = await jwt.verify(
            providedToken,
            process.env.VALIDATE_TOKEN_SECRET
        );
        const userToValidate = await User.findOne({ _id: decodedToken.id });
        if (userToValidate.isVerified) {
            res.status(200).json({
                message: 'Compte déjà validé',
            });
        }
        if (decodedToken.token === userToValidate.userValidationToken) {
            userToValidate.isVerified = true;
            userToValidate.userValidationToken = ' ';
            userToValidate.save();
            res.status(200).json({
                message: 'Compte validé',
            });
        }
    } catch (err) {
        if (err.message === 'jwt expired') {
            const providedToken = req.params.validationToken;
            const decodedToken = jwt.decode(providedToken);
            const user = await User.findOne({ _id: decodedToken.id });
            const validationToken = generateToken(
                { id: user._id, token: user.userValidationToken },
                process.env.VALIDATE_TOKEN_SECRET,
                '1d'
            );
            /* eslint-disable no-use-before-define */
            sendEmailValidation(user, validationToken);
            res.status(200).json({
                message: 'un nouveau mail a été envoyé',
            });
        } else {
            res.status(500).json({
                message: 'Une erreur inattendue est survenue',
            });
        }
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
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error(
                'Identifiant/Mot de passe incorrect ou compte inexistant'
            );
            error.code = 422;
            throw error;
        }
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            const error = new Error(
                'Identifiant/Mot de passe incorrect ou compte inexistant'
            );
            error.code = 422;
            throw error;
        }
        if (!user.isVerified) {
            const error = new Error(
                'Compte non validé, veuillez valider votre compte et réessayer'
            );
            error.code = 403;
            throw error;
        }
        /* eslint-disable no-underscore-dangle */
        const token = generateToken(
            { id: user._id, roleID: user.roles },
            process.env.ACCESS_TOKEN_SECRET,
            '10m'
        );
        /* eslint-disable no-underscore-dangle */
        const refreshToken = generateToken(
            { id: user._id, roleID: user.roles },
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
            '30m'
        );
        const refreshToken = generateToken(
            user,
            process.env.REFRESH_TOKEN_SECRET,
            '60m'
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

exports.getUserFranchiseRequests = async (req, res) => {
    try {
        const selectedUser = await User.findOne({
            // UNCOMMENT LINE BELOW ONCE LOGIN FEATURE READY
            // _id: req.params.id,
            // DELETE LINE BELOW ONCE LOGIN FEATURE READY
            _id: '6324d81ea70c53011eaf4733',
        }).populate('franchiseContracts');

        if (!selectedUser) {
            res.status(404).json({
                message: "Aucun utilisateur trouvé pour l'id donné",
            });
        }

        res.status(200).json(selectedUser);
    } catch (err) {
        res.status(500).json({
            err,
        });
    }
};
