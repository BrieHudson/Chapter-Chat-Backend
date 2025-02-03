// Error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception:', error);
});

const app = require('./app');
const { sequelize } = require('./db');
const syncDatabase = require('./syncDatabase');

const PORT = process.env.PORT || 5012;

async function startServer() {
  try {
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Starting server initialization...');
    
    // Log database URL (remove sensitive info)
    const dbUrl = new URL(process.env.DATABASE_URL);
    console.log('Database host:', dbUrl.hostname);
    console.log('Database port:', dbUrl.port);

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Add error handler for server
    server.on('error', (error) => {
      console.error('Server error:', error);
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


