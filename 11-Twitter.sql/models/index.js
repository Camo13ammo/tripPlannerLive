var Sequelize = require('sequelize');

var twitterjsDB = new Sequelize('twitterjs', 'root', null, {
  dialect: "mysql", 
  port: 3306
})


twitterjsDB
.authenticate()
.then(function(){
  console.log('you are connected')
})
.catch(function(err){
  conso.e.log('there was a problem connecting: ', err)
})


var Tweet = require('./tweet')(twitterjsDB);
var User = require('./user')(twitterjsDB);

User.hasMany(Tweet)
Tweet.belongTo(User)

module.exports = {
  Tweet: Tweet, 
  User: User
};







