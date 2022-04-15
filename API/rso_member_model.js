require('dotenv').config()

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
});

const createRSOMember = (body) => {
    return new Promise(function(resolve, reject) {
      const { name } = body
      let query = 'INSERT INTO rso_member (rso_member, user_uuid, rso_uuid) VALUES (uuid_generate_v4(), $1, $2) RETURNING *';
      pool.query(query, [user_uuid, rso_uuid], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows[0])
      })
    })
}

module.exports = {
    createRSOMember
}