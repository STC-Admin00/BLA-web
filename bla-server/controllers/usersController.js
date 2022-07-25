const User = require('../models/User');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found.'})
    res.json(users);
}

const deleteUser = async (req, res) => {
// SEARCH FOR SPECIFIC MONGODB ISSUED ID
    if (!req?.body?._id) return res.status(400).json({ 'message': 'User ID required.'});
// CREATE THE USER
    const user = await User.findOne({ _id: req.body._id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `User ID ${req.body._id} not found.`});
    }
// DELETE THE USER
    const result = await user.deleteOne({ _id: req.body._id});
    res.json(result);
}

const getUser = async (req, res) => {
// SEARCH FOR SPECIFIC MONGODB ISSUED ID
    if (!req?.params.id) return res.status(400).json({ 'message': 'User ID Required'});
// CREATE THE USER
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `User ID ${req.params.id} not found.` });
    }
    res.json(user);
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser
}