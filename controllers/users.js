//J'importe mon .env
require('dotenv').config();

//J'importe mon modèle Users
const User = require('../models/users');

//J'importe bcrypt pour hasher mes mots de passe et paramètre le nombre de passes
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

//Méthode pour récupérer la liste des utilisateurs
exports.usersList = async (req, res) => {
    try {
        const users = await User.find({});
        
        if (!users) {
            return res.status(404).json({
                message: 'Aucun utilisateur trouvé'
            })
        }
        const listObject = JSON.parse(JSON.stringify(users))
        delete listObject.password;
        res.status(200).send({
            data: listObject
        })
    } catch (err) {
        res.status(500).json({
            err
        });
    }
}

//Méthode pour récupérer les détails d'un utilisateur pour un id donné
exports.userDetails = async (req, res) => {
    try {
        const filterUser = {'_id': req.params.id};
        const userDetails = await User.findOne(filterUser)

        if (!userDetails) {
            return res.status(404).json({
               message: 'Aucun utilisateur pour l\'id donné',
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
}

//Méthode d'édition d'un utilisateur en fonction d'un id donné
exports.userEdit = async (req, res) => {
    try {
        const updatedItems = Object.keys(req.body);
        const filterUser = {'_id': req.params.id};
        const selectedUser = await User.findOne(filterUser)

        if (!selectedUser) {
            return res.status(404).json({
                message: 'Aucun utilisateur pour l\'id donné'
            })
        }
        updatedItems.forEach((update) => {
            selectedUser[update] = req.body[update]
        })
        await selectedUser.save();
        res.status(200).json({
            data: selectedUser
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}

// //Méthode pour créer un utilisateur en utilisant bcrypt hash
// exports.userNew = async (req, res) => {
//   const passwordHash = await  bcrypt.hash(req.body.password, saltRounds)
//     const user = new User({...req.body, password: passwordHash})
//     //user.isActive = false;
//     const createdUser = await user.save();
//     const userObject = JSON.parse(JSON.stringify(createdUser))
//     delete userObject.password;
//     res.status(201).json(userObject);
// }

exports.userNew = async (req, res) => {
    try {
        const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
        const{ lastName, firstName, email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: 'L\'utilisateur existe déjà'
            })
        }

        const addUser = new User({
            lastName,
            firstName,
            email,
            password: passwordHash
        })

        await addUser.save();

        res.status(201).json({
            data: userNew
        })

    } catch (err) {
        res.status(500)
    }
}


//Méthode pour connecter un utilisateur via son email/password
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec();

        if (!user) {
            return res.status(401).json({
                message: 'Utilisateur introuvable'
            });
        }
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(401).json({
                message: 'Mot de passe incorrect'
            });
        }
        await user.generateMainToken();
        await user.generateRefreshToken();

        res.status(200).json({
            data: user,
            message: 'Connexion OK!'
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            err
        })
    }
}

//Méthode pour rafraîchir le jeton d'identification
exports.refreshUserToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({
                message: 'Aucun jeton de refresh fourni'
            })
        }
        await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findOne( refreshToken._id ).exec();

        if (!user) {
            return res.status(401).json({
                message: 'Utilisateur introuvable'
            });
        }
        await user.generateMainToken();
        res.status(200).json({
            data: user.token,
            message: 'Refresh token successful'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            err
        })
    }
}

//Méthode de suppression utilisant la méthode findOne pour s'assurer que l'id donné existe, et la méthode findOneAndDelete pour supprimer le document
exports.userDelete = async (req, res) => {
    try {
        const filterUser = {'_id': req.params.id};
        const selectedUser = await User.findOne(filterUser)

        if (!selectedUser) {
            return res.status(404).json({
                message: 'Aucun utilisateur trouvé pour l\'id donné'
            })
        }
        await User.findOneAndDelete({
            "_id": req.params.id
        })
        res.status(200).json({
            message: 'Utilisateur supprimé avec succès'
        })
    } catch (err) {
        res.status(500).json({
            err
        });
    }
}

exports.userLogout = async (req, res) => {
    try {
        const filterUser = {'_id': req.params.id};
        const selectedUser = await User.findOne(filterUser)

        if (!selectedUser) {
            return res.status(401).json({
                message: 'Aucun utilisateur trouvé pour l\'id donné'
            })
        }
        selectedUser.token = '';
        selectedUser.refreshToken = '';
        await selectedUser.save();
        res.status(200).json({
            message: 'Déconnexion OK'
        })
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
}
