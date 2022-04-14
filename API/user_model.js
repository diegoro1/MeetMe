require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
});

const getUsers = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM users', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const createUser = (body) => {
  return new Promise(function(resolve, reject) {
    const { first_name, last_name, gender, date_of_birth, hash, email, university } = body;
    console.log("ID")
    console.log(university)
    let query = 'INSERT INTO users( user_uuid, firts_name, last_name, gender, date_of_birth, hash, email, university_uuid) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7) RETURNING *';
    pool.query(query, [first_name, last_name, gender, date_of_birth, hash, email, university], (error, results) => {
      if (error) {
        console.log("Error with user_model");
        console.log(error)
        reject(error);
      }
    resolve(results.rows[0]);
    })
  })
}

const userExist = (body) => {
  return new Promise(function(resolve, reject) {
    const {email, password} = body;
    let query = 'SELECT * FROM users WHERE email=$1 AND hash=$2'
    pool.query(query, [email, password], (error, results) => {
      if (error) {
        console.log("Error with user_model");
        console.log(error)
        reject(error);
      }
      resolve(results.rows[0]);
    })
  })
}

module.exports = {
  getUsers,
  createUser,
  userExist
}
