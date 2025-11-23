const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User.model');
const Technician = require('./models/Technician.model');

dotenv.config({ path: path.join(__dirname, '.env') });

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data (optional, be careful in production)
        // await User.deleteMany({});
        // await Technician.deleteMany({});

        // Create Admin
        const adminEmail = 'admin@quickfix.com';
        let admin = await User.findOne({ email: adminEmail });
        if (!admin) {
            admin = await User.create({
                name: 'Admin User',
                email: adminEmail,
                password: 'password123',
                role: 'admin',
                location: 'Headquarters'
            });
            console.log('✅ Admin created: admin@quickfix.com / password123');
        } else {
            console.log('ℹ️ Admin already exists');
        }

        // Create Technician
        const techEmail = 'tech@quickfix.com';
        let techUser = await User.findOne({ email: techEmail });
        if (!techUser) {
            techUser = await User.create({
                name: 'John Technician',
                email: techEmail,
                password: 'password123',
                role: 'technician',
                location: 'Mumbai'
            });

            await Technician.create({
                user: techUser._id,
                skills: ['Electrical', 'Plumbing'],
                hourlyRate: 500,
                bio: 'Expert technician with 5 years of experience.',
                experience: 5,
                isVerified: true
            });
            console.log('✅ Technician created: tech@quickfix.com / password123');
        } else {
            console.log('ℹ️ Technician already exists');
        }

        // Create Customer
        const userEmail = 'user@quickfix.com';
        let customer = await User.findOne({ email: userEmail });
        if (!customer) {
            customer = await User.create({
                name: 'Jane Customer',
                email: userEmail,
                password: 'password123',
                role: 'customer',
                location: 'Delhi'
            });
            console.log('✅ Customer created: user@quickfix.com / password123');
        } else {
            console.log('ℹ️ Customer already exists');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
};

seedDatabase();
