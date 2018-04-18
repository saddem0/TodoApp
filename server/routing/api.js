const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const router = require('express').Router();

const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/TodosDb', (err, client) => {
        if (err) return console.log(err)
        let db = client.db('TodosDb')
        closure(db);
    })
}

// get all todos
router.get('/todos/:userID', function (req, res) {
    let qry = {
        _id: ObjectID(req.params.userID)
    };
    connection(db => {
        db.collection('users').findOne(qry).then(result => {
            res.send(result.todos)
        }).catch(err => {
            sendError(err, res, 501);
        })
    })
})

// add todo
router.post('/todos/:userID', function (req, res) {
    let qry = {
        _id: ObjectID(req.params.userID)
    };
    connection(db => {
        db.collection('users').updateOne(qry, {
            $addToSet: {
                todos: req.body
            }
        }).then(result => {
            res.send('todo added')
        }).catch(err => {
            sendError(err, res, 501);
        })
    })
})

// get todo by id
router.get('/todos/:userID/:index', function (req, res) {
    let qry = {
        _id: ObjectID(req.params.userID)
    };
    connection(db => {
        db.collection('users').findOne(qry).then(result => {
            res.send(result.todos[req.params.index])
        }).catch(err => {
            sendError(err, res, 501);
        })
    })
})

// update todo
router.put('/todos/:userID/:index', function (req, res) {
    let qry = {
        _id: ObjectID(req.params.userID)
    };
    connection(db => {
        db.collection('users').updateOne(qry,{$set:{["todos." + req.params.index]:req.body}}).then(result =>
            res.send('todo updated')
        )
    })
})
// delete todo
router.delete('/todos/:userID/:index', function (req, res) {
    let qry = {
        _id: ObjectID(req.params.userID)
    };
    connection(db => {
        db.collection('users').updateOne(qry, {$unset:{["todos." + req.params.index]:""}}).then(result => {
            res.send('todo deleted')
        }).catch(err => {
            sendError(err, res, 501);
        })
    })
})

module.exports = router;
