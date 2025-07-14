const mongoose = require('mongoose');
const User = require('../models/User');

// Update these values as needed
const userData = {
  firebaseUid: 'nDJWGP7pThUfZrge5xF7kmz3tDv2',
  name: 'Your Name',
  email: '5epmgllc@gmail.com',
  xp: 0,
  badges: [],
  tags: [],
};

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/levelup';

async function addUser() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const existing = await User.findOne({ firebaseUid: userData.firebaseUid });
    if (existing) {
      console.log('User already exists:', existing);
    } else {
      const user = await User.create(userData);
      console.log('User created:', user);
    }
  } catch (err) {
    console.error('Error adding user:', err);
  } finally {
    await mongoose.disconnect();
  }
}

addUser(); 