require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.ceoAUTH = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const currentToken = authHeader && authHeader.split(' ')[1];
    console.log(currentToken);
    if (currentToken) {
        jwt.verify(
            currentToken,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decodedToken) => {
                console.log(decodedToken);
                if (err) {
                    res.status(401).json({ message: 'Non autorisé' });
                }
                if (decodedToken.roleID.roleName !== 'PDG') {
                    res.status(403).json({ message: 'Accès PDG Requis' });
                }
                next();
            }
        );
    } else {
        res.status(401).json({ message: 'Non autorisé, token invalide' });
    }
};
