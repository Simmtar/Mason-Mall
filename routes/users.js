var express = require('express');
var router = express.Router();
var mongodb= require('mongodb');
var async = require('async');
// 创建一个mongodb的客户端
var MongoClient = mongodb.MongoClient;
// 创建一个url,顺便连接一下test库
var DB_CONN_STR = 'mongodb://localhost:27017/test';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 登陆
router.all('/login',function(req, res, next){
	// post
	var username = req.body['username'];
	var pwd = req.body['password'];
	// 
	MongoClient.connect(DB_CONN_STR, function(err, db){
		if(err){
			console.log(err);
		}else{
			console.log('数据库test连接成功');
			findData(db);
		}
	})
	// 
	function findData(db){
		var conn = db.collection('user');
		var data = {username:username, pwd:pwd};
		// 查询数据库
		conn.find(data).toArray(function(err,results){
			if(err){
				console.log(err);
			}else if(results.length > 0){
				// console.log(results.length);
				req.session.username = results[0].username;
				res.redirect('/');
			}else{
				res.redirect('/login');
			}
		})
		db.close();
	}
});


// 注册
router.all('/register',function(req, res, next){	
	// post
	var username = req.body['username'];
	var pwd = req.body['password'];

	MongoClient.connect(DB_CONN_STR,function(err,db){
		if(err){
			console.log(err);
		}else{
			console.log('数据库test连接成功');
			insertData(db);
		}
	})

	function insertData(db){
		var conn = db.collection('user');
		var data = [{username:username, pwd: pwd}];
		console.log(data);
		if(username != null && username != ''){
			conn.insert(data, function(err, results){
				if(err){
					console.log(err);
				}else{
					console.log(results); 
					res.send('1');//向前台发送数据；
					db.close();
				}
			})
		}
		
	}
	
})
// 评论列表
router.all('/list', function(req, res, next) {
  var pageNo = parseInt(req.body['pageNo']); //当前是第几页

  var pageSize = 5; //每页显示多少条数据
  var totalPage = 0; //总共有多少页
  var count = 0; //总共有多少条数据

  console.log(pageNo);
  function findData(db) {
    var conn = db.collection('content');

    async.series([
      function(callback) {
        conn.find({}).toArray(function(err, results) {
          count = results.length;
          totalPage = Math.ceil(count/pageSize);

          // 对地址栏用户手动输入数据进行判断
          pageNo = pageNo > totalPage ? totalPage : pageNo;
          pageNo = pageNo < 1 ? 1 : pageNo;

          callback(null,pageNo);
        })
      },
      function(callback) {
        conn.find({}).sort({uid: -1}).skip((pageNo-1)*pageSize).limit(pageSize).toArray(function(err, item) {
          if (err) {
            console.log(err);
          } else {
            callback(null,item)
          }
        })
      }
    ], function(err, results) {
      // console.log(results);
      res.send({arr:results[1],count:count,totalPage:totalPage,pageNo:pageNo});
      db.close();
    })

    // 从skip条开始 取limit条数据


    // db.close();
  }

  MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log('连接数据库成功');
    findData(db);
  })
})



// 评论
router.all('/comment',function(req, res, next){
	// var wid = parseInt(req.body['id']);

	var content = req.body['content'];
	console.log(content);
	var username = req.session.username;
	console.log(username);
	MongoClient.connect(DB_CONN_STR,function(err,db){
		if(err){
			console.log(err);
		}else{
			console.log('数据库test连接成功');
			// if(username == null ){
				// res.redirect('/login');
			// }else{
				insertData(db);
			// }
			
		}
	})

	function insertData(db){
		var conn = db.collection('content');
		var ids = db.collection('ids');
		
		var udate = new Date();
		
		
		// 串行有关联
		async.waterfall([
			function(callback){
				// 查询ids里，name为content的uid的值
				ids.findAndModify(
					{name:'content'},//查询
					[['_id','desc']],//排序
					{$inc:{uid:1}},//修改更新 uid =uid +1
					function(err,results){
						callback(null,results.value.uid)
					}
				)
			},
			function(uid,callback){

				var data = [{/*wid:wid,*/uid:uid,username:username,content:content,udate:udate}];
				conn.insert(data, function(err, results){
					callback(null,'');
				})
			}
		],function(err,results){
			console.log(results); 
			// res.send('1');//向前台发送数据；
			res.redirect('/comment/list');
			db.close();
		})

		
	}
});



module.exports = router;
