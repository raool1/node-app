const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like CSS if needed later)
app.use(express.static(path.join(__dirname, 'public')));

// Route: GET login form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Route: POST login form
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple static validation (replace with DB in real apps)
  if (username === 'admin' && password === 'password123') {
    res.send('✅ Login successful!');
  } else {
    res.send('❌ Invalid credentials');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

