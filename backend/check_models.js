const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        console.log('Fetching models from:', url);
        const response = await axios.get(url);
        console.log('Available Models:');
        response.data.models.forEach(model => {
            console.log(`- ${model.name} (Supported methods: ${model.supportedGenerationMethods})`);
        });
    } catch (error) {
        console.error('Error listing models:', error.response ? error.response.data : error.message);
    }
}

listModels();
