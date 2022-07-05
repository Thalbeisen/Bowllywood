exports.getAllRoles = (req, res) =>
res.status(200).json({
    message: 'Voici la liste de tous les rôles disponibles sur ce serveur'
})

exports.getUsersByRole = (req, res) => 
res.status(200).json({
    message:'Voici la liste des utilisateurs bénéficiant de ce rôle'
})