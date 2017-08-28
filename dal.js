const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/robots';
let robots = [];
let unemployedRobots = [];
let employedRobots = [];

function getAllDocs(err, db){
  console.log(err)
  const collection = db.collection('users');
  collection.find({}).toArray(function(err, docs){
    robots = docs;
    db.close();
  });
}

function connectMongodb(url, cb){
  MongoClient.connect(url, cb);
}
 function getRobots(){
   connectMongodb(url, getAllDocs)
   return robots
 }
 function getRobot(id){
   let chosenRobot = {};
   for(let i = 0; i < robots.length; i++){
     if(robots[i].id === id){
       chosenRobot = robots[i];
     }
   }
   return chosenRobot
 }
 function findUnemployed(err, db){
   console.log('error', err);
   const collection = db.collection('users');
   collection.find({job:null}).toArray(function(err, docs){
     unemployedRobots = docs;
     db.close();
   })
 }
 function getUnemployed(){
   connectMongodb(url, findUnemployed);
   return unemployedRobots;
 };

 function findEmployed( err, db){
   console.log('error', err);
   const collection = db.collection('users');
   collection.find({"job":{$not: {$in:["null"]}}}).toArray(function(err, docs){
     employedRobots = docs;
     db.close();
   })
 }
 function getEmployed(){
   connectMongodb(url, findEmployed);
   return employedRobots;
 }
 module.exports = {
   getRobots: getRobots,
   getRobot: getRobot,
   getUnemployed: getUnemployed,
   getEmployed: getEmployed,
 }
