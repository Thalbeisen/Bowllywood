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
                    return res.status(401).json({ message: 'Non autorisé' });
                }
                if (decodedToken.roleID.roleName !== 'PDG') {
                    return res
                        .status(403)
                        .json({ message: 'Accès PDG Requis' });
                }
                next();
            }
        );
    } else {
        return res
            .status(401)
            .json({ message: 'Non autorisé, token invalide' });
    }
};


/*const checkUserPerms =
    (...allowedPerms) =>
    (req, res, next) => {
        console.log(req.headers.roleid);
        if (!req?.headers.roleid)
            return res.status(401).json({ message: 'Accès non autorisé' });
        const permsList = [...allowedPerms];
        console.log(permsList);
        console.log(req.headers.roleid);
        const permsResult = req.headers.roleid
            .map((role) => permsList.includes(role))
            .find((val) => val === true);
        if (!permsResult)
            return res.status(403).json({ message: 'Accès interdit' });
        next();
    };

module.exports = checkUserPerms;*/
