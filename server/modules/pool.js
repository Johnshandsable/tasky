const pg = require('pg');

const pool = new pg.Pool({
  database: 'weekend-to-do-app',
  host: 'localhost',
  port: 5432,
});

pool.on('connect', () => {
  console.log('connected to postgres');
});

pool.on('error', (err) => {
  console.log('error connecting to postgres', err);
});

module.exports = pool;
