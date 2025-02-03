const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('Initializing database connection...');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    statement_timeout: 60000,
    connectTimeout: 60000,
    application_name: 'chapter_chatter'
  },
  pool: {
    max: 10,
    min: 2,
    idle: 20000,
    acquire: 60000
  },
  logging: (msg) => console.log('Sequelize Log:', msg),
  retry: {
    max: 3,
    match: [
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/
    ],
    backoffBase: 1000,
    backoffExponent: 1.5,
  }
});

module.exports = { sequelize };






