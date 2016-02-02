// Make sure your `mongod` process is running!
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/assessjs');
mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error: '));
//---------VVVV---------  your code below  ---------VVV----------

var articleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	lastUpdatedAt: {
		type: Date,
		default: Date.now
	},
	tags: {
		type: [String],
		get: function (tagsArr) {
			return tagsArr.join(', ');
		}
	}
});

articleSchema.virtual('snippet').get(function () {
	return `${this.content.slice(0,23)}...`;
});

articleSchema.methods.truncate = function (amount) {
	this.content = this.content.slice(0,amount);
};

articleSchema.statics.findByTitle = function (title, cb) {
	return this.findOne({
		title: title
	}).exec(cb);
};

articleSchema.pre('save', function (next) {
	this.lastUpdatedAt = Date.now();
	next();
});


//---------^^^---------  your code above  ---------^^^----------
var Article = mongoose.model('Article', articleSchema);
module.exports = Article;
