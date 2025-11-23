const ForumPost = require('../models/ForumPost.model');

// @desc    Create a new forum post
// @route   POST /api/forum
// @access  Private
exports.createPost = async (req, res) => {
    try {
        const { title, content, category } = req.body;

        const post = await ForumPost.create({
            author: req.user.id,
            title,
            content,
            category,
        });

        const populatedPost = await ForumPost.findById(post._id).populate(
            'author',
            'name role'
        );

        res.status(201).json({
            success: true,
            data: populatedPost,
        });
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// @desc    Get all forum posts
// @route   GET /api/forum
// @access  Public
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await ForumPost.find()
            .populate('author', 'name role')
            .populate('comments.author', 'name role')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: posts,
        });
    } catch (error) {
        console.error('Get posts error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// @desc    Add a comment to a post
// @route   POST /api/forum/:id/comments
// @access  Private
exports.addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const post = await ForumPost.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        const newComment = {
            author: req.user.id,
            content,
        };

        post.comments.push(newComment);
        await post.save();

        const updatedPost = await ForumPost.findById(req.params.id)
            .populate('author', 'name role')
            .populate('comments.author', 'name role');

        res.json({
            success: true,
            data: updatedPost,
        });
    } catch (error) {
        console.error('Add comment error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// @desc    Upvote a post
// @route   PUT /api/forum/:id/upvote
// @access  Private
exports.upvotePost = async (req, res) => {
    try {
        const post = await ForumPost.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        post.upvotes += 1;
        await post.save();

        res.json({
            success: true,
            data: post,
        });
    } catch (error) {
        console.error('Upvote post error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};
// @desc    Upvote a comment
// @route   PUT /api/forum/:id/comments/:commentId/upvote
// @access  Private
exports.upvoteComment = async (req, res) => {
    try {
        const post = await ForumPost.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        const comment = post.comments.id(req.params.commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found',
            });
        }

        comment.upvotes += 1;
        await post.save();

        res.json({
            success: true,
            data: post,
        });
    } catch (error) {
        console.error('Upvote comment error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};
// @desc    Delete a post
// @route   DELETE /api/forum/:id
// @access  Private (Admin or Author)
exports.deletePost = async (req, res) => {
    try {
        const post = await ForumPost.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        // Check if user is admin or author
        if (req.user.role !== 'admin' && post.author.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized',
            });
        }

        await post.deleteOne();

        res.json({
            success: true,
            message: 'Post removed',
        });
    } catch (error) {
        console.error('Delete post error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};
