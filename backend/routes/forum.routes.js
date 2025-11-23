/**
 * Forum Routes - Placeholder
 */

const express = require('express');
const router = express.Router();

const forumController = require('../controllers/forum.controller');
const { protect } = require('../middleware/auth.middleware');

// GET /api/forum - Get all posts
router.get('/', forumController.getAllPosts);

// POST /api/forum - Create a new post
router.post('/', protect, forumController.createPost);

// POST /api/forum/:id/comments - Add a comment
router.post('/:id/comments', protect, forumController.addComment);

// PUT /api/forum/:id/upvote - Upvote a post
router.put('/:id/upvote', protect, forumController.upvotePost);

// PUT /api/forum/:id/comments/:commentId/upvote - Upvote a comment
router.put('/:id/comments/:commentId/upvote', protect, forumController.upvoteComment);

// DELETE /api/forum/:id - Delete a post
router.delete('/:id', protect, forumController.deletePost);

module.exports = router;
