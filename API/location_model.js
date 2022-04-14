require('dotenv').config()

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DBNAME,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const getLocations = () => {
  console.log(process.env.DB_USER);
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM location', (error, results) => {
      console.log(results);
      if (error) {
        console.log(error);
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

module.exports = {
  getLocations
}
