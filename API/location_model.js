require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
});

const getLocations = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM location', (error, results) => {
      if (error) {
        console.log("Error when creating a new location...")
        console.log(error)
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const createLocation = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, address, longitude, latitude } = body
    let query = 'INSERT INTO location (location_uuid, name, address, longitude, latitude) VALUES (uuid_generate_v4(), $1, $2, $3, $4) RETURNING *';
    pool.query(query, [name, address, longitude, latitude], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0])
    })
  })
}



module.exports = {
  getLocations,
  createLocation
}
