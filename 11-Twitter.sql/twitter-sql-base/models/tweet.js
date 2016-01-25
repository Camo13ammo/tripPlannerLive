
var Sequelize = require('sequelize');

// exporting a function that takes a db object 
module.exports = function(db) {
    var Tweet = db.define('Tweet', {
        tweet: Sequelize.STRING
    }, {
        timestamps: false // this will deactivate the time columns
    });

    // this is our model; 
    // returned by the .define method 
    // .defining a table on the sequelize database object 
    return Tweet;
}

