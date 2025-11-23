const ChatMessage = require('../models/ChatMessage.model');

// @desc    Get chat messages for a booking
// @route   GET /api/chat/:bookingId
// @access  Private
exports.getMessages = async (req, res) => {
    try {
        const messages = await ChatMessage.find({ booking: req.params.bookingId })
            .populate('sender', 'name avatar')
            .sort({ createdAt: 1 });

        res.json({
            success: true,
            data: messages,
        });
    } catch (error) {
        console.error('Get messages error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// @desc    Send a message
// @route   POST /api/chat
// @access  Private
exports.sendMessage = async (req, res) => {
    try {
        const { bookingId, recipientId, message } = req.body;

        const newMessage = await ChatMessage.create({
            booking: bookingId,
            sender: req.user.id,
            recipient: recipientId,
            message,
        });

        const populatedMessage = await ChatMessage.findById(newMessage._id).populate(
            'sender',
            'name avatar'
        );

        // Emit socket event
        const io = req.app.get('io');
        io.to(bookingId).emit('receive_message', populatedMessage);

        res.status(201).json({
            success: true,
            data: populatedMessage,
        });
    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};
