// app.js
const express = require('express');
const connectDB = require('./db');
const router = require('./router');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use Routes
app.use('/api', router);

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
