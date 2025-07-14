const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.get('/api/metrics', (req, res) => {
  res.json({
    metrics: [{ type: 'revenue', value: 2800000, change: 18, period: '30' }]
  });
});

app.post('/api/contact', (req, res) => {
  console.log(req.body);
  res.json({ success: true, message: 'Contact submitted!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
