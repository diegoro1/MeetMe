require('dotenv').config()

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
});

const createAdmin = (body) => {
    return new Promise(function(resolve, reject) {
      const { name } = body
      let query = 'INSERT INTO admin (admin_uuid, user_uuid, university_uuid) VALUES (uuid_generate_v4(), $1, $2) RETURNING *';
      pool.query(query, [user_uuid, university_uuid], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows[0])
      })
    })
}

const findAdminWithUser = (body) => {
  return new Promise(function(resolve, reject) {
    const { name } = body
    let query = 'SELECT * FROM admin WHERE user_uuid=$1 RETURNING *';
    pool.query(query, [user_uuid], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0])
    })
  })
}

module.exports = {
    createAdmin,
    findAdminWithUser
}
  