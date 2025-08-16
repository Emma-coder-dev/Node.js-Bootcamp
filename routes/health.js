const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Health check endpoint
router.get('/', async (req, res) => {
  try {
    // Check database connection
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    // Check memory usage
    const memoryUsage = process.memoryUsage();
    
    // Check uptime
    const uptime = process.uptime();
    
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: {
        seconds: Math.floor(uptime),
        minutes: Math.floor(uptime / 60),
        hours: Math.floor(uptime / 3600)
      },
      database: {
        status: dbStatus,
        name: mongoose.connection.name || 'N/A'
      },
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
        external: `${Math.round(memoryUsage.external / 1024 / 1024)} MB`
      },
      environment: process.env.NODE_ENV || 'development',
      version: process.version
    };

    // Set appropriate status code based on health
    const statusCode = dbStatus === 'connected' ? 200 : 503;
    
    res.status(statusCode).json({
      success: dbStatus === 'connected',
      message: dbStatus === 'connected' ? 'API is healthy' : 'API is unhealthy - database disconnected',
      data: healthData
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      success: false,
      message: 'Health check failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Detailed health check with database ping
router.get('/detailed', async (req, res) => {
  try {
    let dbPing = null;
    let dbStatus = 'disconnected';
    
    // Try to ping the database
    if (mongoose.connection.readyState === 1) {
      try {
        const start = Date.now();
        await mongoose.connection.db.admin().ping();
        dbPing = Date.now() - start;
        dbStatus = 'connected';
      } catch (pingError) {
        dbStatus = 'ping_failed';
      }
    }

    const healthData = {
      status: dbStatus === 'connected' ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      database: {
        status: dbStatus,
        ping: dbPing ? `${dbPing}ms` : 'N/A',
        name: mongoose.connection.name || 'N/A',
        host: mongoose.connection.host || 'N/A',
        port: mongoose.connection.port || 'N/A'
      },
      system: {
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development'
      }
    };

    const statusCode = dbStatus === 'connected' ? 200 : 503;
    
    res.status(statusCode).json({
      success: dbStatus === 'connected',
      message: dbStatus === 'connected' ? 'Detailed health check passed' : 'Detailed health check failed',
      data: healthData
    });
  } catch (error) {
    console.error('Detailed health check error:', error);
    res.status(500).json({
      success: false,
      message: 'Detailed health check failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
