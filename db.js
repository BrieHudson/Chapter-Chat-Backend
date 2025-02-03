const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('Initializing database connection...');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000
  },
  logging: console.log
});

// Test connection function
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
}

module.exports = { 
  sequelize,
  testConnection
};






