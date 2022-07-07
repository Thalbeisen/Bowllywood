require('dotenv').config();
const jwt = require('jsonwebtoken')
const refreshList = {};


const auth = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader && bearerHeader.split(' ')[1]
    console.log(token)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if (err) {
            return res.status(401).json({
                message: 'Access denied'
            })
        }
        next();
    })
}

module.exports = auth;