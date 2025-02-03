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
    statement_timeout: 60000
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

// Enhanced test connection function
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    console.log('Connection Info:', {
      host: sequelize.config.host,
      port: sequelize.config.port,
      database: sequelize.config.database,
      ssl: sequelize.options.dialectOptions.ssl.require ? 'enabled' : 'disabled'
    });
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', {
      error: error.message,
      name: error.name,
      code: error.original?.code,
      detail: error.original?.detail
    });
    return false;
  }
}

// Added health check function
async function healthCheck() {
  try {
    await sequelize.query('SELECT 1');
    return true;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
}

module.exports = { 
  sequelize,
  testConnection,
  healthCheck
};






