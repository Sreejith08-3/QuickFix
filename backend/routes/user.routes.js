/**
 * User Routes
 * Placeholder - Add user-related endpoints
 */

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

// GET /api/users/profile
router.get('/profile', protect, (req, res) => {
  res.json({ success: true, data: req.user });
});

// TODO: Add more user endpoints
// - Update profile
// - Upload avatar
// - Get bookings
// - etc.

module.exports = router;
