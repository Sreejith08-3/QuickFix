/**
 * Booking Routes - Placeholder
 */

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

const bookingController = require('../controllers/booking.controller');

// POST /api/bookings
router.post('/', protect, bookingController.createBooking);

// GET /api/bookings/user - Get user bookings
router.get('/user', protect, bookingController.getUserBookings);

// GET /api/bookings/technician - Get technician bookings
router.get('/technician', protect, bookingController.getTechnicianBookings);

// GET /api/bookings/:id - Get booking by ID
router.get('/:id', protect, bookingController.getBookingById);

// PUT /api/bookings/:id/status - Update booking status
router.put('/:id/status', protect, bookingController.updateBookingStatus);

module.exports = router;
