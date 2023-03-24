const User = require('../models/users');

// middleware for doing role-based permissions
exports.permit =
    (...permittedRoles) =>
    // return a middleware
    async (req, res, next) => {
        const user = await User.findOne({
            _id: req.body.userID,
        });

        if (
            (user && permittedRoles.includes(user.userRole)) ||
            user.id === req.params.id ||
            user.franchiseContracts.includes(req.params.id)
        ) {
            // role is allowed, so continue on the next middleware
            next(); 
        } else {
            // user is forbidden
            res.status(403).json({ message: 'Forbidden' });
        }
    }