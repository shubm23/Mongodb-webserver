const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var password = '123abc!';

//password Hashing
bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(password,salt,(err,hash)=>{
    console.log(hash);
  });
});

var hashPassword = '$2a$10$79nFNbOEWYQwTFG/.nRfqu6rsPqkdyLdFORQh1YzmHZ2rFILNQifS';

bcrypt.compare(password,hashPassword,(err,res)=>{
  console.log(res);
})

// var data = {
//   id:10
// };
//
// // var token = jwt.sign(data,'123abc');
// // console.log(token);
// var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjJjYWE0OWE0MTI4OTA0Y2M0MTM3ODEiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTI5NjUzODMzfQ.WlNHC6OuOuqk-qMYjyc7RZnHbpnjIyjT02ZZ7T6X4oM';
// var decode = jwt.verify(token,'abc123');
// console.log(`Decode ${JSON.stringify(decode,undefined,2)}`);


// var data = {
//   id: 10
// };
//
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust!');
// }
