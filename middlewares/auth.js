require('dotenv').config();
const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    try {
        const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!user) {
            throw new Error();
        }
        next();
    } catch (err) {
        res.status(401).json({
            message: 'Unauthorized'
        })
    }
}

module.exports = auth;