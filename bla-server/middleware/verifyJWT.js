const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
// VALIDATE AUTH HEADER FROM REQUEST
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
// CREATE TOKEN
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.RFRSH_TKN_SCRT,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.username = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

module.exports = verifyJWT