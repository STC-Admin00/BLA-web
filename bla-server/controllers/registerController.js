const User = require('../models/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { firstName,
            lastName,
            email,
            username,
            password,
            gender
        } = req.body;
        console.log(req.body)
    if (!email || !password || !username) return res.status(400).json({ 'message': 'Email, password and/or username are invalid.'})
    
// CHECK FOR DUPLICATE USERNAMES IN THE DB
        const duplicate = await User.findOne({ email: email }).exec();
        if (duplicate) return res.sendStatus(409);

        try {
// ENCRYPT THE PASSWORD
        const hashedPass = await bcrypt.hash(password, 15);
// CREATE AND STORE NEW USER
        const result = await User.create({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "username": username,
            "password": hashedPass,
            "gender": gender
        })

        console.log(result);

        res.status(201).json({ "message": `New user ${firstName}, has been created.`});
        } catch (err) {
        res.status(500).json({ "message": err.message});
        }
}

module.exports = { handleNewUser };