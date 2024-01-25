const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middleware/authenticate');
const User = require('../models/User');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email }, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed. Please check your credentials.' });
  }
});

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      name: user.name,
      email: user.email,
      // Add other profile information as needed
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching profile.' });
  }
});

module.exports = router;
