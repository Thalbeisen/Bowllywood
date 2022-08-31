const checkUserPerms =
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

module.exports = checkUserPerms;
