const express = require('express');
const playerRoutes = require('./routes/playerRoutes');

const app = express();

// Middleware
app.use(express.json());

// Use the player routes
app.use('/api/players', playerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({message: err.message});
});

module.exports = app;