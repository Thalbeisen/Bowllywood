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

const UserValidation = require('../models/userValidation');

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
        const user = new User({ ...req.body, password: passwordHash });
        const createdUser = await user.save();
        const uniqueString = uuidv4();
        const hashedUniqueString = await bcrypt.hash(uniqueString, saltRounds);
        /* eslint-disable no-underscore-dangle */
        const validationToken = generateToken(
            { id: user._id, token: hashedUniqueString },
            // { token: hashedUniqueString },
            process.env.VALIDATE_TOKEN_SECRET,
            '10m'
        );
        console.log(hashedUniqueString);
        const userValidation = new UserValidation({
            uniqueString: validationToken,
        });
        const userValidationObject = await userValidation.save();
        // eslint-disable-next-line no-underscore-dangle
        createdUser.userValidation = userValidationObject.uniqueString;
        const editUser = await createdUser.save();
        /* eslint-disable no-use-before-define */
        sendEmailValidation(user, validationToken);
        const userObject = JSON.parse(JSON.stringify(editUser));
        delete userObject.password;
        res.status(201).json(userObject);
    } catch (err) {
        res.status(400).json({
            message: err,
        });
    }
};

const sendEmailValidation = async (user, validationToken) => {
    const mailHtml = mailTemplate({
        url: `http://localhost:3000/users/validate/${validationToken}`,
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
    console.log(mailContent.attachment);
    await transporter
        .sendMail(mailContent)
        .catch(() => {
            console.log("Une erreur est survenue lors de l'envoi du mail");
        })
        .catch(() => {
            console.log(
                'Une erreur est survenue lors du cryptage, merci de réessayer'
            );
        });
};

// const userValidate = (user) => {
//     console.log(user);
//     try {
//         if (!user) {
//             res.status(404).json({
//                 message: "Aucun utilisateur trouvé pour l'id donné",
//             });
//         }
//         if (!tokenIsValid) {
//             console.log('link invalide');
//         }
//         User.updateOne({ _id: req.params.id }, { isVerified: true });
//         res.status(200).json({
//             message: 'Utilisateur activé',
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };

exports.userValidate = async (req, res) => {
    try {
        const providedToken = req.params.validationToken;
        // console.log(`Tu me fournis ce token ${providedToken}`);
        const decodedToken = await jwt.verify(
            providedToken,
            process.env.VALIDATE_TOKEN_SECRET
        );
        console.log(
            `Je décode ce token d'activation ${JSON.stringify(decodedToken)}`
        );
        const storedToken = await UserValidation.findOne(
            {
                uniqueString: req.params.validationToken,
                // _id: '632326dd94e5e8b39dd1f877',
            },
            'uniqueString'
        );
        // const decodedStoredToken = await jwt.verify(
        //     storedToken.uniqueString,
        //     process.env.VALIDATE_TOKEN_SECRET
        // );
        // console.log(`J'ai ce token dans la base ${decodedStoredToken.token}`);
        // const userToBeValidated = await User.findOne({
        //     userValidation: decodedStoredToken.id
        // })
        console.log(`Provided token ${providedToken}`);
        console.log(`Stored token ${storedToken.uniqueString}`);
        if (providedToken === storedToken.uniqueString) {
            console.log('hello');
            User.updateOne(
                { userValidation: storedToken.uniqueString },
                { isVerified: true }
            );
        }
        // console.log(req.params);
        // if (!decodedToken) {
        //     res.status(401).json({
        //         message: 'Accès interdit, token invalide',
        //     });
        // }
        // const userToValidate = await userValidation.findOne({
        //     userID: decodedToken.id,
        // });
        // const decodedUserToken = await jwt.verify(
        //     userToValidate.uniqueString,
        //     process.env.VALIDATE_TOKEN_SECRET
        // );
        // console.log(`tokenalacon ${decodedUserToken.uniqueString}`);
        // console.log('Tout semble ok, on peut continuer');
        // User.updateOne({ _id: decodedToken._id }, { isVerified: true });
        // res.status(200).json({
        //     message: 'Utilisateur activé',
        // });
    } catch (err) {
        console.log(err);
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
        const user = await User.findOne({ email })
            .populate('userValidation')
            .exec();
        console.log(req.body);
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
            // Début
            if (!user.userValidation) {
                const uniqueString = uuidv4();
                const hashedUniqueString = await bcrypt.hash(
                    uniqueString,
                    saltRounds
                );
                const validationToken = generateToken(
                    // { id: user._id, token: hashedUniqueString }
                    { token: hashedUniqueString },
                    process.env.VALIDATE_TOKEN_SECRET,
                    '10m'
                );
                const userValidation = new UserValidation({
                    uniqueString: validationToken,
                });
                const userValidationObject = await userValidation.save();
                console.log(userValidationObject);
                console.log(userValidationObject.uniqueString);
                // eslint-disable-next-line no-underscore-dangle
                user.userValidation = userValidationObject.uniqueString;
                await user.save();
                // Envoi du mail
                /* eslint-disable no-use-before-define */
                sendEmailValidation(user, validationToken);
                console.log(user);
            }
            // fin
            const error = new Error(
                'Compte non validé, veuillez valider votre compte et réessayer'
            );
            error.code = 418;
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
        console.log('nlanlanla');
        const code = err.code ?? 500;
        console.log(err.message);
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
