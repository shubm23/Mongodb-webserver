var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
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

app.listen(4000, () => {
  console.log('Started on port 4000');
});

module.exports ={app};
