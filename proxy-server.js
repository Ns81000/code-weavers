const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const querystring = require('querystring');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Pastebin API endpoint
const PASTEBIN_API_URL = 'https://pastebin.com/api/api_post.php';

// Pastebin API key from environment variable
const API_DEV_KEY = process.env.PASTEBIN_API_KEY;

// Create paste endpoint
app.post('/create-paste', async (req, res) => {
    try {
        const {
            api_option,
            api_paste_code,
            api_paste_expire_date,
            api_paste_format,
            api_paste_name,
            api_paste_private
        } = req.body;

        // Validate required fields
        if (!API_DEV_KEY || !api_paste_code) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Prepare form data
        const formData = querystring.stringify({
            api_dev_key: API_DEV_KEY,
            api_option,
            api_paste_code,
            api_paste_expire_date,
            api_paste_format,
            api_paste_name,
            api_paste_private
        });

        // Make request to Pastebin API
        const response = await fetch(PASTEBIN_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        const data = await response.text();

        // Check for error response
        if (data.startsWith('Bad API request')) {
            return res.status(400).json({ error: data });
        }

        // Return the paste URL
        res.json({ url: data });
    } catch (error) {
        console.error('Error creating paste:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
}); 