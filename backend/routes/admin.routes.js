const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const adminController = require('../controllers/admin.controller');

// All routes are protected and require admin role
// Note: authorize middleware needs to be implemented or updated
router.use(protect);

// GET /api/admin/dashboard
router.get('/dashboard', adminController.getDashboardStats);

// PUT /api/admin/technicians/:id/approve
router.put('/technicians/:id/approve', adminController.approveTechnician);

// DELETE /api/admin/technicians/:id (Reject)
router.delete('/technicians/:id', adminController.rejectTechnician);

module.exports = router;
