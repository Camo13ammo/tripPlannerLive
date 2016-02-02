var express = require('express');
var router = express.Router();

var Article = require('../models/article');

/**
 *
 *___ _____ _   ___ _____   _  _ ___ ___ ___
 / __|_   _/_\ | _ \_   _| | || | __| _ \ __|
 \__ \ | |/ _ \|   / | |   | __ | _||   / _|
 |___/ |_/_/ \_\_|_\ |_|   |_||_|___|_|_\___|
 *
 * 
 */

router.get('/articles', function (req, res, next) {
	Article.find().exec()
	.then(function (articles) {
		res.json(articles);
	})
	.then(null, next);
});

router.get('/articles/:id', function (req, res, next) {
	res.json(req.article);
});

router.post('/articles', function (req, res, next) {
	Article.create(req.body)
	.then(function (createdArticle) {
		res.json({
			message: 'Created successfully',
			article: createdArticle
		});
	})
	.then(null, next);
});

router.put('/articles/:id', function (req, res, next) {
	req.article.set(req.body);
	req.article.save()
	.then(function (updatedArticle) {
		res.json({
			message: 'Updated successfully',
			article: updatedArticle
		});
	})
	.then(null, next);
});

router.param('id', function (req, res, next, id) {
	Article.findById(id).exec()
	.then(function (article) {
		req.article = article;
		next();
	})
	.then(null, next);
});

module.exports = router;
