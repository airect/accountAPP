/**
 * Created by Administrator on 2016/1/29.
 */
var mongo = require('./db');

function Check() {

}
/**
 * 获取单个账单或账单列表
 * @param {Object} check
 */
Check.prototype.getCheck = function(check, callback) {
    mongo.open(function(err, db) {
        if(err) return callback(err);
        db.collection('check' ,function(err, collection) {
            if(err) return callback(err);
            collection.find(check).toArray(function(err, items) {
                if(err) return callback(err);
                if(typeof(items) === 'array' && items.length == 1) {
                    return callback(null, items[0]);
                } else {
                    return callback(null, items);
                }
            });
        });
    });
}

/**
 * 增加一个账目
 * @param {Object} 一条账单
 */
Check.prototype.addCheck = function(check, callback) {
    //格式检测

    mongo.open(function(err, db) {
        if(err) return callback(err);
        db.collection('check', function(err, collection) {
            if(err) return callback(err);
            collection.insert(check, {safe: true}, function(err, result) {
                if(err) return callback(err);
                return callback(null, result);
            });
        });
    });
}

/**
 * 删除一条账目
 */
Check.prototype.delCheck = function(check, callback) {
    mongo.open(function(err, db) {
        if(err) return callback(err);
        db.collection('check', function(err ,collection) {
            if(err) return callback(err);
            collection.remove(check, {safe:true}, function(err, results) {
                if(err) return callback(err);
                return callback(null, results);
            })
        });
    });
}