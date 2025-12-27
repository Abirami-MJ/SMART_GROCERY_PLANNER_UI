const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React Router (return `index.html` for all routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Smart Grocery Planner running at http://localhost:${port}`);
  console.log('📱 Open your browser to start using the app!');
});