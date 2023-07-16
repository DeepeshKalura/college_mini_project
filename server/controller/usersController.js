
const User = require('../model/User');
const Note = require('../model/Note')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// @desc    Get all users
// @route   GET /users
// @access  Private

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if (!users?.length) {
        return res.status(404).json({ message: 'No users found' });
    }
    res.json(users);
});


// @desc    Create a users
// @route   Post /users
// @access  Private

const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;
    // Confirm data
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    // Check if user already exists
    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'User already exists' });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ username, "password": hashedPassword, roles });
    if (newUser) {
        res.status(201).json({ message: `New User ${username} created` });
    } else {
        res.status(400).json({ message: 'Invalid user data received' });
    }
});


// @desc    update a users
// @route   Patch /users
// @access  Private

const updateUser = asyncHandler(async (req, res) => {
    const { id, username, password, roles, active } = req.body;

    // Confirm data
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // check for duplicate 
    const duplicate = await User.findOne({ username }).lean().exec();

    // Allow updates to the original user
    if (duplicate && duplicate._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate Username' });
    }

    user.username = username;
    user.roles = roles;
    user.active = active;

    if (password) {
        user.password = await bcrypt.hash(password, 10); // salt rounds
    }

    const updatedUser = await user.save();


    res.json({ message: `User update user name ${updatedUser.username}` });

});

// @desc    Delete a users
// @route   Patch /users
// @access  Private

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Usr ID are required' });
    }

    const notes = await Note.findOne({ user: id }).lean().exec();

    if (notes) {
        return res.status(400).json({ message: 'User has assigned notes' });
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const result = await user.deleteOne();
    const reply = `Username ${result.username} deleted with Id ${result._id}`;
    res.json({ message: reply });

});

module.exports = {
    getUsers,
    createNewUser,
    updateUser,
    deleteUser
};