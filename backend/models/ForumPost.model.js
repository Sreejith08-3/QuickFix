const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        upvotes: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const forumPostSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: [
                'electrical',
                'plumbing',
                'carpentry',
                'painting',
                'hvac',
                'appliance',
                'other',
            ],
        },
        upvotes: {
            type: Number,
            default: 0,
        },
        comments: [commentSchema],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('ForumPost', forumPostSchema);
