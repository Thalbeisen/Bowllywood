require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * Middleware gérant l'authentification au niveau de l'API
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    try {
        const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!user) {
            throw new Error();
        }
        req.body.userID = user.id;
        req.body.roleID = user.roleID;
        req.body.workingResID = user.workingResID;
        next();
    } catch (err) {
        // let errMsg = (err.name == 'TokenExpiredError') ? 'Vous avez été déconnecté.' : 'Vous devez être connecté pour accéder à ces informations.';
        if (!err.name == 'TokenExpiredError') {
            let errMsg = 'Vous devez être connecté pour accéder à ces informations.';
            res.status(401).json({
                message: errMsg,
            });
        }
    }
};

module.exports = auth;