//let MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');
const obj = require('./obj');
let url = "mongodb://localhost:27017/TodoApp";

MongoClient.connect(url,(err,db)=>{
  if (err) throw err;

  let dbo = db.db('TodoApp');
  dbo.collection('Users').find({name: 'Clementine Bauch'}).count().then((c)=>{
    // console.log('Finding');
    console.log('No. of Objects ',c);
  },(err)=>{
    console.log('Unable to fetch',err);
  })

  db.close();
});
