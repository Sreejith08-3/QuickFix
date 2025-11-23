const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        technician: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Assuming technicians are also Users with role='technician'
        },
        serviceCategory: {
            type: String,
            required: [true, 'Service category is required'],
            enum: [
                'electrical',
                'plumbing',
                'carpentry',
                'painting',
                'hvac',
                'appliance',
                'locksmith',
                'cleaning',
                'other',
            ],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
            default: 'pending',
        },
        scheduledDate: {
            type: Date,
            required: [true, 'Scheduled date is required'],
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
        },
        estimatedCost: {
            type: Number,
            required: true,
        },
        actualCost: {
            type: Number,
        },
        photos: [String],
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        review: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Booking', bookingSchema);
