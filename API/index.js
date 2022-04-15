const express = require('express');
const app = express();
const port = 3001;

const admin_model = require('./admin_model');
const admin_owns_rso = require('./admin_owns_rso_model')
const comment_model = require('./comment_model');
const location_model = require('./location_model');
const rso_member_model = require('./rso_member_model');
const rso_model = require('./rso_model');
const university_model = require('./university_model');
const user_model = require('./user_model');

const hash = require('./hash.js');

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  // nothing
})

app.get('/API/getUniversities', (req, res) => {
  university_model.getUniversities()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/API/login', (req, res) => {
  user_model.userExist(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/API/createUser', (req, res) => {
  encryptPassword = hash.encrypt(req.body.password)
  university_model.getUniversityWithName({name:req.body.name}).then(response => {
    user_model.createUser({first_name:req.body.first_name, last_name:req.body.last_name, gender:req.body.gender, date_of_birth:req.body.date_of_birth, hash:encryptPassword, email:req.body.email, university:response["university_uuid"]})
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(response);
    });
  })
  .catch(error => {
    res.status(500).send(response);
  })
})

app.post('/API/createRSO', (req, res) => {
  // create the rso
  rso_model.createRSO({name:req.body.name})
  .then(response => {
    for (let user in req.body.users) {
      // make the users members in rso_member
      // make the users admins
      // make the admins go into admin_owns_rso
    }
  })
  .catch(error => {
    res.status(500).send(response);
  })
})

app.post('/API/leaveRSO', (req, res) => {
  // if the user is in rso_member remove them
  // if user is an admin delete from admin and admin_owns_rso
})

app.post('/API/createEvent', (req, res) => {
  // public events
  // create event with admin super rso and university uuid empty

  // private events
  // create event with admin rso uuid empty

  // rso events
  // create event with university empty
})

app.get('/API/getUsersEvents', (req, res) => {
  // get all public events
  // get all events that have the same university_uuid
  // go htrough rso_member table and see which rsos they're apart of then get the events with those rso_uuid
})

app.post('/API/createComment', (req, res) => {
  comment_model.createComment(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/API/deleteComment', (req, res) => {
  comment_model.deleteComment(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/API/updateComment', (req, res) => {
  comment_model.updateComment(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
