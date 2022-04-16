require('dotenv').config()

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
});

const createEvent = (body) => {
    return new Promise(function(resolve, reject) {
        const { time, name, description, admin_uuid, super_admin_uuid, rso_uuid, university_uuid, location } = body
        let query = 'INSERT INTO events (events_uuid, time, name, description, admin_uuid, super_admin_uuid, rso_uuid, university_uuid, location) VALUES (uuid_generate_v4(), $1 $2 $3 $4 $5 $6 $7 $8) RETURNING *';
        pool.query(query, [time, name, description, admin_uuid, super_admin_uuid, rso_uuid, university_uuid, location],  (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows[0])
            })
        })
}

const seeEvents = (body) => {
    return new Promise(function(resolve, reject) {
      const { user_uuid, rso_uuid, university_uuid } = body
      let query = 'SELECT * FROM events WHERE user_uuid=$1 OR rso_uuid=$2 OR university_uuid=$3 RETURNING *';
      pool.query(query, [user_uuid, rso_uuid, university_uuid], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows[0])
      })
    })
  }
  

module.exports = {
  createEvent,
  seeEvents,
}
