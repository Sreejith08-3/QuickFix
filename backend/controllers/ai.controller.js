const AIDiagnostic = require('../models/AIDiagnostic.model');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Run AI Diagnostic
// @route   POST /api/ai/diagnostic
// @access  Private
exports.runDiagnostic = async (req, res) => {
    try {
        const { description } = req.body;

        if (!description) {
            return res.status(400).json({
                success: false,
                message: 'Description is required'
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
        You are an expert home maintenance AI. Analyze the following issue description and provide a structured JSON response.
        Issue Description: "${description}"

        Respond ONLY with valid JSON in the following format (no markdown, no backticks):
        {
            "predictedIssue": "Short title of the issue",
            "severity": "low" | "medium" | "high",
            "estimatedCost": number (in INR, just the number),
            "requiredCategory": "electrical" | "plumbing" | "hvac" | "appliance" | "general",
            "recommendations": ["step 1", "step 2", "step 3"],
            "confidence": number (0-100)
        }
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Clean up response if it contains markdown code blocks
        const jsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const aiData = JSON.parse(jsonString);

        const diagnostic = await AIDiagnostic.create({
            user: req.user.id,
            images: req.body.images || [],
            description,
            predictedIssue: aiData.predictedIssue,
            severity: aiData.severity,
            estimatedCost: aiData.estimatedCost,
            requiredCategory: aiData.requiredCategory,
            confidence: aiData.confidence,
            recommendations: aiData.recommendations
        });

        res.status(201).json({
            success: true,
            data: diagnostic,
            message: 'Diagnostic analysis complete'
        });

    } catch (error) {
        console.error('AI Diagnostic error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during analysis',
            error: error.message
        });
    }
};

// @desc    Chatbot interaction
// @route   POST /api/ai/chatbot
// @access  Private
exports.chatBot = async (req, res) => {
    try {
        const { message, history } = req.body; // history is optional array of {role: 'user'|'model', parts: string}

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const chat = model.startChat({
            history: history || [
                {
                    role: "user",
                    parts: [{ text: "You are QuickFix AI, a helpful assistant for a home maintenance platform. You help users book services (Electrical, Plumbing, HVAC, etc.), check prices, and diagnose issues. Keep responses concise and helpful." }],
                },
                {
                    role: "model",
                    parts: [{ text: "Hello! I'm QuickFix AI. How can I assist you with your home maintenance today?" }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const response = result.response.text();

        // Simple intent detection based on response keywords (optional enhancement)
        let intent = 'general';
        let suggestedAction = null;

        if (response.toLowerCase().includes('book') || response.toLowerCase().includes('schedule')) {
            intent = 'booking';
            suggestedAction = 'show_categories';
        }

        res.json({
            success: true,
            data: {
                response,
                intent,
                suggestedAction
            }
        });
    } catch (error) {
        console.error('Chatbot error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
