require('dotenv').config();

const commonConfig = {
  dialect: 'postgres',
  dialectModule: require('pg'),
  // Remove the entire dialectOptions block
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000
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
  }
};








