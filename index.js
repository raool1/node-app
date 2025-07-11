const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000; // Don't use 443 here

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password123') {
    res.send('✅ Login successful!');
  } else {
    res.send('❌ Invalid credentials');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

