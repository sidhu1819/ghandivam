require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User } = require('./models');

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ghandivam';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, {
      // keep default options; mongoose will handle
      serverSelectionTimeoutMS: 5000
    });

    const username = 'demo';
    const email = 'demo@example.com';
    const phoneNumber = '9999999999';
    const rawPassword = 'demo123';

    let user = await User.findOne({ $or: [{ username }, { email }, { phoneNumber }] });
    if (user) {
      console.log('Demo user already exists. Updating password and verifying...');
      user.password = await bcrypt.hash(rawPassword, 10);
      user.isVerified = true;
      await user.save();
      console.log('Updated existing demo user:', { username, email });
    } else {
      const hashed = await bcrypt.hash(rawPassword, 10);
      user = new User({
        name: 'Demo User',
        username,
        phoneNumber,
        email,
        password: hashed,
        isVerified: true
      });
      await user.save();
      console.log('Created demo user:', { username, email });
    }

    // Print a small login hint
    console.log('\nYou can login with:');
    console.log(`  username: ${username}`);
    console.log(`  password: ${rawPassword}\n`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error seeding demo user:', err);
    process.exit(1);
  }
}

seed();
