const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./middleware/authenticate');
const cors = require('cors');  // Add this line

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define the user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Register a new user
app.post('/auth/register', async (req, res) => {
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
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login Attempt:', email);

    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Login failed. Please check your credentials.' });
  }
});


// Get user profile
app.get('/profile', authenticateToken, async (req, res) => {
  try {
    console.log('User Profile Request:', req.user);

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
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Error fetching profile.' });
  }
});


// Root path route
app.get('/', (req, res) => {
  res.send('Hello, this is the root path!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});