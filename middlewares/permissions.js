const User = require('../models/users');

// middleware for doing role-based permissions
exports.permit =
    (...permittedRoles) =>
    // return a middleware
    async (req, res, next) => {
        const user = await User.findOne({
            _id: req.body.userID,
        });
        // if (user.id)
        console.log(req.body);
        if (
            (user && permittedRoles.includes(user.userRole)) ||
            user.id === req.params.id
        ) {
            next(); // role is allowed, so continue on the next middleware
        } else {
            res.status(403).json({ message: 'Forbidden' }); // user is forbidden
        }
    };
