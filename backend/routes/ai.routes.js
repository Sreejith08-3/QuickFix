/**
 * AI Routes
 * Handles AI-powered features: diagnostics, chatbot, recommendations
 */

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

const aiController = require('../controllers/ai.controller');

// @route   POST /api/ai/diagnostic
// @desc    AI-powered diagnostic from image/video
// @access  Private
router.post('/diagnostic', protect, aiController.runDiagnostic);

// @route   POST /api/ai/chatbot
// @desc    AI chatbot conversation
// @access  Private
router.post('/chatbot', protect, aiController.chatBot);

module.exports = router;
