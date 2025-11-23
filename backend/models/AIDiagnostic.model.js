const mongoose = require('mongoose');

const aiDiagnosticSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        images: [String],
        description: String,
        predictedIssue: {
            type: String,
            required: true,
        },
        severity: {
            type: String,
            enum: ['low', 'medium', 'high', 'critical'],
            required: true,
        },
        estimatedCost: {
            type: Number,
            required: true,
        },
        requiredCategory: {
            type: String,
            required: true,
        },
        confidence: {
            type: Number,
            required: true,
        },
        recommendations: [String],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('AIDiagnostic', aiDiagnosticSchema);
