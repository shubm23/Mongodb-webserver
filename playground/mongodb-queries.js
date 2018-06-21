var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');
const{ObjectID} = require('mongodb');


// var id = "5b2aa329ef3891af7e087f4";
//
// if(!ObjectID.isValid(id)){
//   console.log('Id doesnt exist');
// }

// Todo.find({_id:id}).then((todos)=>{
//   console.log('Todos ',todos);
// });
//
// Todo.findOne({_id:id}).then((todo)=>{
//   console.log('Todo ',todo);
// });

// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log('Id Doesnt exist');
//   }
//   console.log('Todo by Id ',todo);
// }).catch((err) => console.log(err));


User.findById('5b27d10801b59603fe26580f').then((user) => {
  if(!user){
    console.log('User Doesnt exist');
  }
  console.log('User ',user);
}).catch((err) => console.log(err));
