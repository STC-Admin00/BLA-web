const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
// GRAB & CHECK COOKIES FROM REQUEST
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
// GRAB THE REFRESH TOKEN FROM THE COOKIES
    const refreshToken = cookies.jwt;
// LOG THE USER BY THE FOUND REFRESH TOKEN
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403)
// EVALUATE JWT
    await jwt.verify(
        refreshToken,
        process.env.RFRSH_TKN_SCRT,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": decoded.email,
                        "roles": roles
                    }
                },
                process.env.ACCSS_TKN_SCRT,
                { expiresIn: '30s' }
            );
            res.json({ roles, accessToken })
        }
    );
}

module.exports = { handleRefreshToken }