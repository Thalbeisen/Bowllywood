exports.userIndex = (req, res) =>
    res.status(200).json({
        message: 'Voici la liste de tous les utilisateurs',
    });

    exports.userDetails = (req, res) =>
    res.status(200).json({
        message: 'Voici les détails pour cet utilisateur'
    })

exports.userCreate = (req, res) =>
    res.status(201).json({
        message: 'Utilisateur créé avec succès',
    });

exports.userEdit = (req, res) =>
res.status(202).json({
    message: 'Utilisateur modifié avec succès',
})

exports.userDelete = (req, res) => 
res.status(202).json({
    message: 'Utilisateur supprimé avec succès'
})
