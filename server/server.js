var express = require('express');
const _ = require('lodash');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var port = 3000;
var app = express();
const jwt = require('jsonwebtoken');
var {authentication} = require('./middleware/authentication');


app.use('/todos', function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
});
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  let todo = new Todo({
    text:req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  })
});
app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos/:id',(req,res)=>{
  // res.send(req.params);
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
      return res.status(404).send();
   }
   Todo.findById(id).then((todo)=>{
     if(!todo){
       return res.status(404).send();
     }

     res.send({todo});
   }).catch((err) => {
     res.status(400).send();
   });
});
//Deleting
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send(todo);
  }).catch((e) => {
    res.status(400).send();
  });
});
//Updating data
app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,['completed','text']);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send(todo);
  }).catch((e) => {
    res.status(400).send();
  });
});
//Authentication

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('X-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

//User/me

app.get('/users/me', authentication, (req, res) => {
  res.send(req.user);
});

//Listen Port
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports ={app};
//5b2aa1309ef3891af7e087f5
