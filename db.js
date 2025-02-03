const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('Initializing database connection...');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    keepAlive: true
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000
  },
  // Force IPv4
  host: process.env.DATABASE_URL.match(/[@](.+)[:]/)[1],
  protocol: 'tcp',
  dialectModule: require('pg')
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    return false;
  }
};

module.exports = { sequelize, testConnection };





