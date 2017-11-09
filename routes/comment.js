var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
const async = require('async');

var MongoClient = mongodb.MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/test';

router.get('/', function(req, res, next) {
  res.render('detail',{})
});

// 评论列表
router.all('/list', function(req, res, next) {
  var pageNo = parseInt(req.query['pageNo']) || 1; //当前是第几页

  var pageSize = 5; //每页显示多少条数据
  var totalPage = 0; //总共有多少页
  var count = 0; //总共有多少条数据

  function findData(db) {
    var conn = db.collection('content');


    // async.parallel([
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
      console.log(results);
      res.render('detail/?id=1',{
        arr: results[1],
        count: count,
        totalPage: totalPage,
        pageNo: pageNo
      })

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


module.exports = router;