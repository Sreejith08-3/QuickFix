const User = require('../models/User.model');
const Booking = require('../models/Booking.model');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'customer' });
        const totalTechnicians = await User.countDocuments({ role: 'technician' });
        const totalBookings = await Booking.countDocuments();

        // Calculate total revenue (mock calculation based on bookings for now, assuming avg 500)
        const totalRevenue = totalBookings * 500;

        const pendingTechnicians = await User.find({ applicationStatus: 'pending' })
            .select('name email location technicianProfile applicationStatus');

        const recentBookings = await Booking.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('user', 'name')
            .populate('technician', 'name');

        res.json({
            success: true,
            data: {
                stats: {
                    totalUsers,
                    totalTechnicians,
                    totalBookings,
                    totalRevenue
                },
                pendingTechnicians: pendingTechnicians.map(t => ({
                    _id: t._id,
                    user: { name: t.name, location: t.location },
                    skills: t.technicianProfile?.skills || [],
                    status: t.applicationStatus
                })),
                recentBookings
            }
        });
    } catch (error) {
        console.error('Admin dashboard error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Approve technician
// @route   PUT /api/admin/technicians/:id/approve
// @access  Private/Admin
exports.approveTechnician = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                role: 'technician',
                applicationStatus: 'approved',
                'technicianProfile.isVerified': true
            },
            { new: true }
        );

        res.json({ success: true, data: user, message: 'Technician approved' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Reject technician
// @route   DELETE /api/admin/technicians/:id
// @access  Private/Admin
exports.rejectTechnician = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                applicationStatus: 'rejected'
            },
            { new: true }
        );

        res.json({ success: true, message: 'Technician rejected' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
