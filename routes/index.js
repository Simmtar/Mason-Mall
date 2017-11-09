var express = require('express');
var router = express.Router();
var mongodb= require('mongodb');
var async = require('async');
// 创建一个mongodb的客户端
var MongoClient = mongodb.MongoClient;
// 创建一个url,顺便连接一下test库
var DB_CONN_STR = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', uname: req.session.username});
});
router.all('/login', function(req, res, next) {
   res.render('login', {});
});
router.all('/register', function(req, res, next) {
    res.render('register', {});
});
router.all('/A4-1', function(req, res, next) {
    res.render('A4-1', {});
});
router.all('/liebiao', function(req, res, next) {
    res.render('liebiao', {});
});
router.all('/logout', function(req, res, next) {
	req.session.destroy(function(err){
		res.redirect('/');
	})
    
});
/*router.all('/ping', function(req, res, next) {
    res.render('ping', {});
});*/
// 详情页
router.all('/detail', function(req, res, next) {
   var uid=parseInt(req.query['id']);
   var username = req.session.username;
	// console.log(uid);
	MongoClient.connect(DB_CONN_STR, function(err, db){
		db.collection('detail').findOne({id:uid},function(err,results){
			// console.log(results);
			res.render('detail',{obj:results, uname: req.session.username});
		})
	})
});
module.exports = router;
