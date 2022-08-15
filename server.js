const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();

// Importing Routes
const auth = require('./routes/auth');

//Setting up environment variables with dotenv
dotenv.config();

// Connecting database
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes Middlewares
app.use('/api/auth', auth);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});
