var express = require('express');
var router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.post('/chatbot', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": prompt}]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data.choices[0].message.content);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error.toString());
    }
});

module.exports = router;
