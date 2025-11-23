const Booking = require('../models/Booking.model');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
    try {
        const {
            serviceCategory,
            description,
            scheduledDate,
            location,
            technicianId,
            estimatedCost,
        } = req.body;

        const mongoose = require('mongoose');

        let technician = undefined;
        if (technicianId && mongoose.Types.ObjectId.isValid(technicianId)) {
            technician = technicianId;
        }

        const booking = await Booking.create({
            user: req.user.id,
            serviceCategory,
            description,
            scheduledDate,
            location,
            technician, // Will be undefined if invalid ID
            estimatedCost,
            status: 'confirmed', // Auto-confirm for now
        });

        res.status(201).json({
            success: true,
            data: booking,
            message: 'Booking created successfully',
        });
    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings/user
// @access  Private
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate('technician', 'name email phone avatar')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// @desc    Get technician bookings
// @route   GET /api/bookings/technician
// @access  Private (Technician)
exports.getTechnicianBookings = async (req, res) => {
    try {
        // Ensure user is a technician
        if (req.user.role !== 'technician') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Technicians only.',
            });
        }

        // Find bookings where the technician field matches the technician's USER ID
        // The Booking model references 'User' for the technician field.

        const bookings = await Booking.find({ technician: req.user.id })
            .populate('user', 'name email phone location')
            .sort({ scheduledDate: 1 });

        res.json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        console.error('Get technician bookings error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('user', 'name email phone')
            .populate('technician', 'name email phone avatar');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found',
            });
        }

        // Make sure user owns the booking or is an admin/technician
        if (
            booking.user._id.toString() !== req.user.id &&
            req.user.role !== 'admin' &&
            booking.technician?._id.toString() !== req.user.id
        ) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized',
            });
        }

        res.json({
            success: true,
            data: booking,
        });
    } catch (error) {
        console.error('Get booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};
// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private (Technician/Admin)
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found',
            });
        }

        // Check authorization (Technician assigned to booking or Admin)
        if (
            req.user.role !== 'admin' &&
            booking.technician?.toString() !== req.user.id
        ) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this booking',
            });
        }

        booking.status = status;
        await booking.save();

        res.json({
            success: true,
            data: booking,
            message: 'Booking status updated',
        });
    } catch (error) {
        console.error('Update booking status error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};
