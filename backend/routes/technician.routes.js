const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const technicianController = require('../controllers/technician.controller');

// POST /api/technicians/register
router.post('/register', protect, technicianController.registerTechnician);

module.exports = router;
