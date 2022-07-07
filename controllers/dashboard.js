const User = require('../models/users');

exports.userGreeting = (req, res) => {
    console.log(req.headers)
    res.status(200).json({
        message: 'Bonjour utilisateur'
    })
}