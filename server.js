// Error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception:', error);
});

const app = require('./app');
const { testConnection, sequelize } = require('./db');
const syncDatabase = require('./syncDatabase');

const PORT = process.env.PORT || 3001; // Added default port

async function startServer() {
  try {
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Starting server initialization...');
    
    // Test database connection with more detailed logging
    console.log('Testing database connection...');
    const connected = await testConnection();
    if (!connected) {
      console.error('Database connection test failed');
      throw new Error('Failed to establish database connection');
    }
    console.log('Database connection test passed');

    // Sync database in development
    if (process.env.NODE_ENV !== 'production') {
      console.log('Syncing database...');
      await syncDatabase();
      console.log('Database sync completed');
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log('Database connection status:', sequelize.connectionManager.hasOwnProperty('pool'));
    });
  } catch (error) {
    console.error('Failed to start server:', {
      error: error.message,
      stack: error.stack,
      cause: error.cause,
      name: error.name
    });
    process.exit(1);
  }
}

startServer();


