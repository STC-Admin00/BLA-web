const { es } = require('date-fns/locale');
const User = require('../models/User');

const handleLogout = async (req, res) => {
        // -------------***** MUAY IMPORTANTE!! On client, also delete accessToken


// GRAB COOKIES FROM REQUEST
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204);
// PICK OUT THE REFRESH TOKEN
        const refreshToken = cookies.jwt;
// CHECK IF REFRESH TOKEN IS IN DB
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }
// DELETE REFRESH TOKEN IN DB
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = { handleLogout }