require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
});

const getUniversities = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM university ', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const createUniversity = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, num_students, description, location } = body;
    let query = 'INSERT INTO university (university_uuid, name, num_students, description, location) VALUES (uuid_generate_v4(), $1, $2, $3, $4) RETURNING *';
    pool.query(query, [name, num_students, description, location], (error, results) => {
      if (error) {
        reject(error);
      }
    resolve(results.rows[0]);
    })
  })
}

const getUniversityWithName = (body) => {
  return new Promise(function(resolve, reject) {
    const { name } = body;
    let query = 'SELECT * FROM university WHERE name=$1';
    pool.query(query, [name], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows[0])
    })
  })
}

module.exports = {
  getUniversities,
  createUniversity,
  getUniversityWithName
}
