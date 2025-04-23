const jwt = require('jsonwebtoken');
const config = require('../util/config');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Unauthorized: Missing token" });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = authenticate;