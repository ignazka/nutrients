const User = require('./user.model');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

function validationError(error) {
  return error instanceof mongoose.Error.validationError;
}

function isMongoError(error) {
  return error.code === 11000;
}

async function signup(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and Password are required' });
    }
    const hasUser = await User.findOne({ email }).lean();

    if (hasUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ email, password: hashedPassword });
    const userWithoutPassword = { email: user.email, _id: user._id };
    req.session.user = userWithoutPassword;

    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    if (validationError(error)) {
      return res
        .status(400)
        .json({ message: `Validation Error: ${error.message}` });
    }
    if (isMongoError(error)) {
      return res
        .status(400)
        .json({ message: `MongoDB Error: ${error.message}` });
    }
    return res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log('1');
      return res
        .status(400)
        .json({ message: 'Email and Password are required' });
    }
    const user = await User.findOne({ email }).lean();
    if (!user) {
      console.log('2');
      return res.status(400).json({ message: 'User not found. Please signup' });
    }

    const hasCorrectPassword = await bcrypt.compare(password, user.password);
    if (hasCorrectPassword) {
      console.log('3');
      const userWithoutPassword = { email: user.email, _id: user._id };
      req.session.user = userWithoutPassword;
      return res.status(200).json(userWithoutPassword);
    }
    console.log('4');
    return res.status(400).json({ message: 'wrong password' });
  } catch (error) {
    if (validationError(error)) {
      return res.status(400).json({ message: 'validation error' });
    }
    if (isMongoError(error)) {
      return res.status(400).json({ message: 'MongoDB error' });
    }
    return res.status(500).json({ message: error.message });
  }
}

async function logout(req, res) {
  try {
    await req.session.destroy();
    return res.status(200).json({ message: 'logout' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getLoggedInUser(req, res) {
  try {
    const user = req.session.user;
    if (!user) {
      return res.status(400).json(null);
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { signup, login, logout, getLoggedInUser };
