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
      const { user_uuid, rso_uuid } = body
      console.log("In model")
      console.log(user_uuid, rso_uuid)
      let query = 'INSERT INTO rso_member (rso_member, user_uuid, rso_uuid) VALUES (uuid_generate_v4(), $1, $2) RETURNING *';
      pool.query(query, [user_uuid, rso_uuid], (error, results) => {
        if (error) {
          console.log(error);
          reject(error)
        }
        resolve(results.rows[0])
      })
    })
}

const getRSOWithUser = (body) => {
  return new Promise(function(resolve, reject) {
    const { user_uuid } = body
    let query = 'SELECT * FROM rso_member WHERE user_uuid=$1 RETURNING *';
    pool.query(query, [user_uuid], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0])
    })
  })
}

const getMembers = (body) => {
  return new Promise(function(resolve, reject) {
    const {rso_uuid} = body
    let query = 'SELECT * FROM rso_member WHERE rso_uuid=$1 RETURNING *'
    pool.query(query, [rso_uuid], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0])
    })
  })
}

const deleteUser = (body => {
  return new Promise(function(resolve, reject) {
      const { user_uuid } = body
      let query = 'DELETE from rso_member where user_uuid = $1 RETURNING *';
      pool.query(query, [user_uuid], (error, results) => {
          if (error) {
              reject(error)
          }
          resolve(results.rows[0])
      })
  })
})

const deleteEverything = (body => {
  return new Promise(function(resolve, reject) {
      let query = 'DELETE from rso_member ';
      pool.query(query, (error, results) => {
          if (error) {
            console.log(error)
              reject(error)
          }
          resolve(results)
      })
  })
})
module.exports = {
    createRSOMember,
    getRSOWithUser,
    deleteUser,
    deleteEverything
}