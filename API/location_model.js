require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DBNAME,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getLocations = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM location', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

module.exports = {
  getLocations
}
