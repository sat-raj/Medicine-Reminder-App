const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000; // Choose the port you prefer

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/medicine-reminder-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define MongoDB schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// API routes
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  try {
    const user = new User({ firstName, lastName, email, phoneNumber, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
