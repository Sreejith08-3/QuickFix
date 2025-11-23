const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

console.log('--- CONFIG CHECK ---');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Missing');
console.log('JWT_ACCESS_SECRET:', process.env.JWT_ACCESS_SECRET ? 'Set' : 'Missing');
console.log('JWT_REFRESH_SECRET:', process.env.JWT_REFRESH_SECRET ? 'Set' : 'Missing');

if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is missing!');
    process.exit(1);
}

console.log('Attempting MongoDB connection...');
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB connected successfully!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    });
