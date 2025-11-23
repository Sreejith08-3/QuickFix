/**
 * Chat Routes - Placeholder
 */

const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chat.controller');
const { protect } = require('../middleware/auth.middleware');

// GET /api/chat/:bookingId - Get messages for a booking
router.get('/:bookingId', protect, chatController.getMessages);

// POST /api/chat - Send a message
router.post('/', protect, chatController.sendMessage);

module.exports = router;
