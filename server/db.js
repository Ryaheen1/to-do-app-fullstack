// Import required modules
const Pool  = require('pg').Pool;
require('dotenv').config();

// Create a new PostgreSQL connection pool
const pool = new Pool({
    user: process.env.PG_USER, // Use environment variables for security
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
});

// Export the connection pool for use in other modules
module.exports = pool;
