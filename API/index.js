const express = require('express');
const app = express();
const port = 3001;

const location_model = require('./location_model');
const university_model = require('./university_model');
const user_model = require('./user_model')

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  user_model.getUsers()
  .then(response => {
    console.log("Response from user_model...")
    console.log(response);
    res.status(200).send(response);
  })
  .catch(error => {
    console.log("Error from user_model...")
    console.log(error)
    res.status(500).send(error);
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
