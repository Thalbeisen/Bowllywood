/**
 * Méthode permettant la récupération des rôles
 * @param {Object} req
 * @param {String} res
 * @returns
 */
exports.getAllRoles = (req, res) =>
    res.status(200).json({
        message: 'Voici la liste de tous les rôles disponibles sur ce serveur',
    });
