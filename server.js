// StellarOne Health - Full Stack Server
// Main Express.js application file

const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize the Express app
const app = express();

// Environment setup from .env file or default to 3000
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing for all routes
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded request bodies

// Serve the static frontend files (HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// --- API Endpoints ---

/**
 * @route   GET /api/metrics
 * @desc    Returns live Key Performance Indicators (KPIs).
 * @access  Public
 */
app.get('/api/metrics', (req, res) => {
    console.log(`[${new Date().toLocaleTimeString()}] GET /api/metrics`);
    // In a real application, this data would be fetched from a database.
    const mockMetrics = {
        revenue: { value: '₹59L', change: '+12%' },
        claims: { value: '15,847', change: '+8.2%' },
        denialRate: { value: '3.5%', change: '-45%' },
        productivity: { value: '53', change: '+5%' }
    };
    res.status(200).json(mockMetrics);
});

/**
 * @route   POST /api/contact
 * @desc    Accepts contact form submissions.
 * @access  Public
 */
app.post('/api/contact', (req, res) => {
    const { name, email, organization, message } = req.body;
    console.log(`[${new Date().toLocaleTimeString()}] POST /api/contact`);
    console.log('Received Form Submission:', { name, email, organization, message });

    // Basic validation
    if (!name || !email || !organization) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    // TODO: Add logic here to save to a database or send an email.
    
    res.status(200).json({ success: true, message: 'Your message has been received! We will be in touch shortly.' });
});

/**
 * @route   POST /api/ai/chat
 * @desc    Handles prompts for the "Macha Assistant" AI chatbot.
 * @access  Public
 */
app.post('/api/ai/chat', (req, res) => {
    const { message } = req.body;
    console.log(`[${new Date().toLocaleTimeString()}] POST /api/ai/chat - Message: "${message}"`);

    if (!message) {
        return res.status(400).json({ success: false, message: 'Message cannot be empty.' });
    }

    // --- Simulated AI Logic ---
    // In a real application, you would call a service like OpenAI here.
    const lowerMessage = message.toLowerCase();
    let aiResponse = "I can help with questions about claims, denials, and revenue. How can I assist you today?";

    if (lowerMessage.includes("denial")) {
        aiResponse = "We reduce denials by using our DenialAI module to identify root causes and suggest corrective actions before claims are even resubmitted.";
    } else if (lowerMessage.includes("revenue")) {
        aiResponse = `Our current monthly revenue is ₹59 Lakhs. We boost client revenue by ensuring higher clean claim rates and faster payment cycles.`;
    } else if (lowerMessage.includes("patient statement")) {
        aiResponse = "Statement generation is a planned feature. Currently, our platform focuses on optimizing the provider-side revenue cycle.";
    }
    
    res.status(200).json({ response: aiResponse });
});

// --- Server Initialization ---
app.listen(PORT, () => {
    console.log(`StellarOne Health server is running on http://localhost:${PORT}`);
    console.log(`Frontend is served from the 'public' directory.`);
});
