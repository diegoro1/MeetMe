require('dotenv').config()

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
});

const createAdminOwnsRSO = (body) => {
    return new Promise(function(resolve, reject) {
      const { name } = body
      let query = 'INSERT INTO admin_owns_rso  (admin_owns_rso, admin_uid, rso_uuid) VALUES (uuid_generate_v4(), $1, $2) RETURNING *';
      pool.query(query, [admin_uuid, rso_uuid], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows[0])
      })
    })
}

const deleteUser = (body => {
  return new Promise(function(resolve, reject) {
      const { admin_uuid } = body
      let query = 'DELETE from admin_owns_rso where admin_uid = $1 RETURNING *';
      pool.query(query, [admin_uuid], (error, results) => {
          if (error) {
              reject(error)
          }
          resolve(results.rows[0])
      })
  })
})

module.exports = {
    createAdminOwnsRSO,
    deleteUser
}