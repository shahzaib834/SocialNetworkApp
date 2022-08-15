const User = require('../models/userModel');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, secret } = req.body;

    if (!name || !email || !password || !secret) {
      res.status(400).json({
        success: false,
        message: 'Please provide name,email and password to continue',
      });

      return;
    }

    // Checking if user already exists
    // const exists = User.findOne({ email });
    // if (exists) return res.status(400).send('Email Already Taken');

    const user = await User.create({
      name,
      email,
      password,
      secret,
    });

    const token = user.generateWebToken();

    // Saving token into cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.status(201).cookie('token', token, options).json({
      success: true,
      message: 'User Created successfully',
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { registerUser };
