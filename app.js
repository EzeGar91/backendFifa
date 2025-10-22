const express = require('express');
const app = express();
const sequelize = require('./config/db');
const playerRoutes = require('./routes/playerRoutes');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware para desarrollo
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.use('/api/players', playerRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
sequelize.sync().then(() => {
  console.log('✅ Database connected and models synced');
  app.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
    console.log('📊 Health check: http://localhost:3000/health');
    console.log('👥 Players API: http://localhost:3000/api/players');
  });
}).catch(err => {
  console.error('❌ Database connection failed:', err);
});
