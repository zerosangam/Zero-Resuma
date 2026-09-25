// server.js
const express = require('express');
const path = require('path');
const { initCronTasks } = require('./cron-tasks');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve all static files (index.html, style.css, chat.html, images, etc.)
app.use(express.static(path.join(__dirname)));

// Health check endpoint
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Root fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server and launch background cron tasks
app.listen(PORT, () => {
  console.log(`🚀 ZERO Portfolio running on port ${PORT}`);
  
  // Start background cron jobs & keep-alive self-pinger
  initCronTasks();
});
