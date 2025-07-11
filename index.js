const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();
const PORT = 443; // HTTPS port

// SSL certificate and key
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
};

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS/images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Route: GET login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Route: POST login form
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Dummy validation (use database in real life)
  if (username === 'admin' && password === 'password123') {
    res.send('✅ Login successful!');
  } else {
    res.send('❌ Invalid credentials');
  }
});

// Start HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`🔐 HTTPS server running at https://localhost:${PORT}`);
});

