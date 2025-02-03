const { sequelize } = require('./db');
const db = require('./models');

async function syncDatabase() {
  try {
    console.log('Starting database sync...');
    console.log('Database URL format check:', process.env.DATABASE_URL ?
      'URL exists' : 'URL missing');

    // Add connection test
    console.log('Testing connection...');
    await sequelize.authenticate();
    console.log('Database connection verified.');

    // Add model check
    console.log('Available models:', Object.keys(db).filter(key => 
      key !== 'sequelize' && key !== 'Sequelize'
    ));

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');

    return true;
  } catch (error) {
    console.error('Detailed error:', {
      name: error.name,
      message: error.message,
      code: error.parent?.code,
      originalError: error.original
    });
    throw error;
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  syncDatabase()
    .then(() => {
      console.log('Sync completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Sync failed:', error);
      process.exit(1);
    });
}

module.exports = syncDatabase;
