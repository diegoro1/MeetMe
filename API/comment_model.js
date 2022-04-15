require('dotenv').config()

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
});

const createComment = (body) => {
    return new Promise(function(resolve, reject) {
        const { comment, events_uuid, user_uuid } = body
        let query = 'INSERT INTO comments (comment_uuid, events_uuid, user_uuid, comment, name) VALUES (uuid_generate_v4(), $1 $2 $3) RETURNING *';
        pool.query(query, [events_uuid, user_uuid, comment],  (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows[0])
            })
        })
}

const deleteComment = (body => {
    return new Promise(function(resolve, reject) {
        const { comment, events_uuid, user_uuid } = body
        let query = 'DELETE from comments where events_uuid = $1 and user_uuid = $2 RETURNING *';
        pool.query(query, [events_uuid, user_uuid], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows[0])
        })
    })
})

const updateComment = (body => {
    return new Promise(function(resolve, reject) {
        const { comment, events_uuid, user_uuid } = body
        let query = 'UPDATE comments SET comment = $1 WHERE user_uuid = $2 and event_uuid = $3 RETURNING *';
        pool.query(query, [comment, events_uuid, user_uuid], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows[0])
        })
    })
})

module.exports = {
  createComment,
  deleteComment,
  updateComment
}
