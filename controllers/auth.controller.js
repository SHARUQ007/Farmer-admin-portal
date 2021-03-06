// const { Router } from 'express';
const bcrypt =require( 'bcryptjs');
const config =require( '../config/index.js');
const jwt =require( 'jsonwebtoken');
const User =require( '../models/user.model.js') 

const { JWT_SECRET } = config;

exports.login =  async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
      // Check for existing user
      const user = await User.findOne({ email });
      if (!user) throw Error('User does not exist');
      if (!user.checkPassword(password)) throw Error('Invalid credentials');

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
      if (!token) throw Error('Couldnt sign the token');

      res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          admin_roles:user.admin_roles
        }
      });

    } catch (e) {
      res.status(400).json({ message: e.message });
    }
};

// exports.register =  async (req, res) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'Please enter all fields' });
//     }

//     try {
//       const user = await User.findOne({ email });
//       if (user) throw Error('User already exists');

//       const newUser = new User({
//         name,
//         email,
//         password
//       });

//       const savedUser = await newUser.save();
//       if (!savedUser) throw Error('Something went wrong saving the user');

//       const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
//         expiresIn: 3600
//       });

//       res.status(200).json({
//         token,
//         user: {
//           id: savedUser.id,
//           name: savedUser.name,
//           email: savedUser.email
//         }
//       });

//     } catch (e) {
//       res.status(400).json({ error: e.message });
//     }
// };

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

exports.getPassword =  async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User Does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
