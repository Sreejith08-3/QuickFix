/**
 * Service Routes - Placeholder
 */

const express = require('express');
const router = express.Router();

// GET /api/services
router.get('/', (req, res) => {
  res.json({ success: true, data: [] });
});

module.exports = router;
