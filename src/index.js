const express = require('express');
const axios = require('axios');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Add CORS headers (optional but good practice)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Logging middleware - logs every request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// GET /me - Main Profile Endpoint
// ============================================
app.get('/me', async (req, res) => {
  try {
    console.log('Fetching cat fact from API...');

    // Fetch cat fact from external API with timeout
    const catFactResponse = await axios.get('https://catfact.ninja/fact', {
      timeout: 5000 // 5 second timeout
    });

    const catFact = catFactResponse.data.fact;
    console.log('Cat fact fetched successfully:', catFact);

    // Generate current UTC timestamp in ISO 8601 format
    const timestamp = new Date().toISOString();

    // Construct response object - EXACT FORMAT REQUIRED
    const response = {
      status: 'success',
      user: {
        email: process.env.USER_EMAIL || 'user@example.com',
        name: process.env.USER_NAME || 'Your Name',
        stack: process.env.USER_STACK || 'Node.js/Express'
      },
      timestamp: timestamp,
      fact: catFact
    };

    // Set correct content type header
    res.setHeader('Content-Type', 'application/json');
    
    // Return response with 200 status
    res.status(200).json(response);
    
    console.log('Response sent successfully');

  } catch (error) {
    console.error('❌ Error occurred:', error.message);

    // Different error handling based on error type
    let statusCode = 500;
    let errorMessage = 'Internal server error';

    if (error.code === 'ECONNABORTED') {
      statusCode = 504;
      errorMessage = 'Cat Facts API request timed out';
    } else if (error.response) {
      statusCode = error.response.status;
      errorMessage = `External API error: ${error.response.statusText}`;
    } else if (error.request) {
      statusCode = 503;
      errorMessage = 'Could not reach Cat Facts API';
    }

    // Return error response
    res.setHeader('Content-Type', 'application/json');
    res.status(statusCode).json({
      status: 'error',
      message: errorMessage,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Health Check Endpoint
// ============================================
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root Endpoint (Optional)
// ============================================
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Backend Wizards Stage 0 API',
    endpoints: {
      profile: 'GET /me',
      health: 'GET /health'
    }
  });
});

// 404 Handler
// ============================================
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});

// Error Handler
// ============================================
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Start Server
// ============================================
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║   🧙 Backend Wizards Stage 0 API 🧙    ║
  ║   Server running on port ${PORT}          ║
  ║   Local: http://localhost:${PORT}          ║
  ║   Endpoint: http://localhost:${PORT}/me    ║
  ╚════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});
