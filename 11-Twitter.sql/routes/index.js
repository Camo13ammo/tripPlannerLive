var express = require('express');

var router = express.Router();

var Tweet = require('../models/index').Tweet; 
var User = require('../models/index').User; 


router.get('/', function(req, res, next) {
  // eager loading
  Tweet.findAll({include: [User]})
  .then(function(tweets){
    res.render('index', {
      tweets: tweets, 
      showForm: true
    })
  })
  .catch(next)

})

router.get('/users/:name', function(req, res, next) {

  User.findOne({where: {name: req.params.name}})
  .then(function(user){
    var promiseForTweets = Tweet.findAll({where: {UserId: user.id}, include: [User]})
    return promiseForTweets;  
  })
  .then(function(tweets){
    res.render('index', {
      tweets: tweets
    })
  })
  .catch(next)

})

// get a single tweet for a single user 
router.get('/users/:name/tweets/:id', function(req, res, next) {

  Tweet.findById(Number(req.params.id), {include: [User]})
  .then(function(tweet){
    res.render('index', {
      tweets: [tweet]
    })
  })
  .catch(next)


})

// findOrCreate - > 
// find the user 
// if the user doesnt exist, create it 
// and then create a tweet for that user 
// redirect 
router.post('/', function(req, res, next) {
  User.findOne({where: {name: req.body.name}})
  .then(function(user){
    if (user) return user; 
    else return User.create({name: req.body.name})
  })
  .then(function(user){
    return Tweet.create({tweet: req.body.tweet, UserId: user.id})
  })
  .then(function(){
    res.redirect('/')
  })
  .catch(next)
})


module.exports = router;
