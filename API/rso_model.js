require('dotenv').config()

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
});

const getAllRSO = () => {
  console.log(process.env.DB_USER);
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM RSO', (error, results) => {
      console.log(results);
      if (error) {
        console.log(error);
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const createRSO = (body) => {
  return new Promise(function(resolve, reject) {
    const { name } = body
    let query = 'INSERT INTO RSO (rso_uuid, name) VALUES (uuid_generate_v4(), $1) RETURNING *';
    pool.query(query, [name], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0])
    })
  })
}

module.exports = {
  getAllRSO,
  createRSO
}
