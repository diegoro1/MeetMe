const express = require('express')
const app = express()
const port = 3001

const location_model = require('./location_model')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  location_model.getLocations()
  .then(response => {
    console.log("Response")
    console.log(response);
    res.status(200).send(response);
  })
  .catch(error => {
    console.log("Error")
    console.log(error)
    res.status(500).send(error);
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
