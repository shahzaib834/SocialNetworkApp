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
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({
        success: false,
        message: 'Email Already Taken',
      });

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
      message: 'User Created successfully. Please Login',
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: 'Something Went Wrong',
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please enter email and password',
      });

      return;
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });

      return;
    }

    const isPasswordMatched = await user.matchPassword(password);

    if (!isPasswordMatched) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });

      return;
    }

    const token = user.generateWebToken();

    // Saving token into cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.status(200).cookie('token', token, options).json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

const logout = async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

module.exports = { registerUser, loginUser, logout };
