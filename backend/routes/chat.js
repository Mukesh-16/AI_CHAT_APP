const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// Correct Hugging Face API URL
const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-R1-Distill-Qwen-32B';; // Example model;
const API_KEY = process.env.HUGGING_FACE_API_KEY;

router.post('/chat', async (req, res) => {
    const { message } = req.body; // Ensure `message` is extracted correctly
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const response = await axios.post(
            HUGGING_FACE_API_URL,
            {
                inputs: message, // Correct payload structure
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
            }
        );

        // Access the response correctly 
        const aiReply = response.data[0]?.generated_text || 'Sorry, no response from AI.';
        res.json({ reply: aiReply });
    } catch (error) {
        console.error('Error communicating with Hugging Face API:', error.message);
        res.status(500).send('Error communicating with Hugging Face AI');
    }
});

module.exports = router;