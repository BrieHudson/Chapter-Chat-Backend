// sequelize.config.js
require('dotenv').config();

const commonConfig = {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    ...commonConfig,
  },
  test: {
    url: process.env.DATABASE_URL,
    ...commonConfig,
  },
  production: {
    url: process.env.DATABASE_URL,
    ...commonConfig,
  },
};







