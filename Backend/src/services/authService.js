const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const error = new Error('Email already in use');
        error.statusCode = 400;
        throw error;
    }

    const user = await User.create({
        name,
        email,
        password,
        role: "user",
    });

    const token = generateToken(user._id, user.role);

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token,
    };
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken(user._id, user.role);

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token,
    };
};

module.exports = {
    registerUser,
    loginUser,
};