const mongoose = require('mongoose');
const User = require('./models/User.model');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const adminData = {
    name: 'Admin User',
    email: 'admin@quickfix.com',
    password: 'admin123',
    phone: '1234567890',
    role: 'admin',
    isVerified: true
};

mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');

        // Check if admin exists
        let admin = await User.findOne({ email: adminData.email });

        if (admin) {
            console.log('Admin user already exists. Updating password...');
            admin.password = adminData.password; // Will be hashed by pre-save hook
            admin.role = 'admin';
            await admin.save();
        } else {
            console.log('Creating new admin user...');
            admin = await User.create(adminData);
        }

        console.log('✅ Admin user ready!');
        console.log(`Email: ${adminData.email}`);
        console.log(`Password: ${adminData.password}`);

        process.exit(0);
    })
    .catch((err) => {
        console.error('Error:', err);
        process.exit(1);
    });
