//J'importe mon modèle Users
const User = require('../models/users');

//J'importe bcrypt pour hasher mes mots de passe et paramètre le nombre de passes
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

exports.userCreate = async (req, res) => {
  const passwordHash = await  bcrypt.hash(req.body.password, saltRounds)
    const user = new User({...req.body, password: passwordHash})
    const createdUser = await user.save();
    delete createdUser.password;
    res.status(201).json(createdUser);
}

exports.userEdit = async (req, res) => {
    const editedUser = await User.findOne({
        "_id": req.params.id
    })
    .update({...req.body})
    delete editedUser.password;
res.status(200).json(editedUser)
}

exports.userDelete = async (req, res) => {
    const userToDelete = await User.findOneAndDelete({
        "_id": req.params.id
    })
res.status(200).json({
    message: 'Utilisateur supprimé avec succès'
})
}
