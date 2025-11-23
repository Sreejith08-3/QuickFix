const mongoose = require('mongoose');
const User = require('./models/User.model');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const email = process.argv[2];

if (!email) {
    console.log('Usage: node create_admin.js <email>');
    process.exit(1);
}

mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`User with email ${email} not found.`);
            process.exit(1);
        }

        user.role = 'admin';
        await user.save();

        console.log(`✅ User ${user.name} (${user.email}) is now an Admin!`);
        console.log('You can now log in and access the Admin Dashboard.');

        process.exit(0);
    })
    .catch((err) => {
        console.error('Error:', err);
        process.exit(1);
    });
