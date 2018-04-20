const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const router = require('express').Router();
var jwt = require('jsonwebtoken');

const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/TodosDb', (err, client) => {
    if (err) return console.log(err)
    let db = client.db('TodosDb')
    closure(db);
  })
}

// Error handling
const sendError = (err, res, code) => {
  response.status = code;
  response.message = typeof err == 'object' ? err.message : err;
  response.data = [];
  res.status(code).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

router.post('/login', function (req, res) {
  let qry = {
    "email": req.body.email,
    "password": req.body.password
  };
  connection(db => {
    db.collection('users').findOne(qry).then(result => {
      console.log(result);
      if (result) {
        let token = jwt.sign({
          _id: result._id
        }, 'secret', );
        response.data = {
          token: token
        };
        response.message = 'ok';
        response.status = 200;
        res.json(response);
      } else {
        sendError('Login Invalide', res, 401);
      }
    }).catch(err => {
      sendError(err, res, 501);
    })
  })


})

router.post('/register', function (req, res) {
  let qry = {
    "email": req.body.email
  };
  connection(db => {
    db.collection('users').findOne(qry).then(result => {
      console.log(req.body.email);
      if (result) {
        response.status = 401;
        response.message = "account already exists";
        response.data = jwt.sign(result, 'secret');
      } else {
        db.collection('users').insertOne(req.body)
        response.status = 200;
        response.message = "register succes";
        response.data = jwt.sign(req.body, 'secret', );
      }
      res.json(response)
    }).catch(err => {
      sendError(err, res, 409);
    })
  })
})

module.exports = router;
