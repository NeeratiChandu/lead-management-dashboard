const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const leadsRouter = require('./routes/leads');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'));

// Basic login endpoint (hardcoded for simplicity; use bcrypt in prod)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    const token = require('jsonwebtoken').sign({ username }, process.env.JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.use('/api/leads', leadsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));