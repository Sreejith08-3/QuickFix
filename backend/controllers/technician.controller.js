const User = require('../models/User.model');

// @desc    Register as a technician (Apply)
// @route   POST /api/technicians/register
// @access  Private
exports.registerTechnician = async (req, res) => {
    try {
        const { skills, experience, hourlyRate, bio, location } = req.body;

        // Update user with technician details
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                location, // Update main location field
                technicianProfile: {
                    skills,
                    experience,
                    hourlyRate,
                    bio,
                },
                applicationStatus: 'pending',
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: user,
            message: 'Application submitted successfully',
        });
    } catch (error) {
        console.error('Technician registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};
