require('dotenv').config();

const commonConfig = {
  dialect: 'postgres',
  protocol: 'postgres',
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
    acquire: 30000,
    idle: 10000
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







