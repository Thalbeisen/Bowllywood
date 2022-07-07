//J'importe mon .env
require('dotenv').config();

//J'importe mon modèle Users
const User = require('../models/users');

//J'importe bcrypt pour hasher mes mots de passe et paramètre le nombre de passes
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');


//Méthode pour récupérer la liste des utilisateurs au moyen d'un filtre initialisé à vide
exports.userIndex = async (req, res) => {
const filterUser = {};
const usersList = await User.find(filterUser);
    res.status(200).json(usersList);
}

//Méthode pour récupérer les détails d'un utilisateur au moyen 
exports.userDetails = async (req, res) => {
    const filterUser = {'_id': req.params.id};
    const usersList = await User.findOne(filterUser);
    res.status(200).json(usersList);
}

//Méthode pour créer un utilisateur en utilisant bcrypt hash
exports.userCreate = async (req, res) => {
  const passwordHash = await  bcrypt.hash(req.body.password, saltRounds)
    const user = new User({...req.body, password: passwordHash})
    //user.isActive = false;
    const createdUser = await user.save();
    const userObject = JSON.parse(JSON.stringify(createdUser))
    delete userObject.password;
    res.status(201).json(userObject);
}

//Méthode de connexion de l'utilisateur
exports.userLogin = async (req, res) => {
    const user = await User.findOne({
        "email": req.body.email
    })
    if (!user) {
    return res.status(400).json('Nom d\'utilisateur ou mot de passe invalide!')
    }
    const passwordValidation = await bcrypt.compare(req.body.password, user.password);
    if (!passwordValidation) {
        return res.status(400).json('Nom d\'utilisateur ou mot de passe invalide!')
    }
    console.log('diag ACCESS_TOKEN_SECRET' + process.env.ACCESS_TOKEN_SECRET)
    console.log('diag REFRESH_TOKEN_SECRET' + process.env.REFRESH_TOKEN_SECRET)
    user.userToken = jwt.sign({
        data: user._id
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    res.setHeader('Authorization', 'Bearer ' + user.userToken)
    return res.status(200).json(user.userToken);
}

//Méthode pour modifier un utilisateur
exports.userEdit = async (req, res) => {
    const editedUser = await User.findOne({
        "_id": req.params.id
    })
    .update({...req.body})
    delete editedUser.password;
res.status(200).json(editedUser)
}

//Méthode pour supprimer un utilisateur en utilisant la méthode findOneAndDelete
exports.userDelete = async (req, res) => {
    const userToDelete = await User.findOneAndDelete({
        "_id": req.params.id
    })
res.status(200).json({
    message: 'Utilisateur supprimé avec succès'
})
}

exports.userDashboard = (req, res) => {
    try {
        const decodedToken = jwt.verify(req.body.userToken, 'secret');
        res.status(200).json({
            message: 'Bon, je veux bien l\'admettre, ça vend pas du rêve mais faut imaginer un beau dashboard à la place!'
        })
    } catch(err) {
        res.status(401).json({
            message: 'Jeton Web JSON invalide, accès interdit!'
        })
    }
}
