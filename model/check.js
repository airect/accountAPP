/**
 * 账单列表
 * @author airect
 */
var mongo = require('./db');
var ObjectId = require('mongodb').ObjectID;
function Check(userId) {
    if (!userId) return false;
    this.userId = userId;
}

module.exports = Check;

/**
 * 获取一个用户的账单列表
 * @param {Object} condition 账单条件
 */
Check.prototype.getCheck = function(condition, callback) {
    condition = condition || {};
    var tmp_condition = {
        '_id': ObjectId(this.userId),
        'checks': condition
    };
    //return callback(null, tmp_condition);
    mongo.open(function(err, db) {
        if(err) return callback(err);
        db.collection('user' ,function(err, collection) {
            if(err) return callback(err);
            //return callback(null, tmp_condition);
            collection.find(tmp_condition).toArray(function(err, items) {
                if (err) return callback(err);
                return callback(null, items);
            });
        });
    });
};

/**
 * 获取一条账目
 * @param check
 * @param callback
 */
Check.getOneCheck = function(check , callback) {
    mongo.open(function(err, db){
        if(err) return callback(err);
        db.collection('check', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            };
            collection.findOne(check, function(err, acheck){
                mongo.close();
                if(err) return callback(err);
                return acheck;
            });
        });
    });
}
/**
 * 增加一个账目
 * @param {Object} 一条账单
 */
Check.addCheck = function(check, callback) {
    mongo.open(function(err, db) {
        if(err) return callback(err);
        db.collection('check', function(err, collection) {
            if(err) {mongo.close(); return callback(err);}
            collection.insert(check, {safe: true}, function(err, result) {
                mongo.close();
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
/**
 * 检测数据
 *
 */
Check.isComplete = function(check, callback) {
    if(typeof check != 'object') {
        return callback({error: 'not_object', msg: '数据校验错误：check is not a object'});
    }
    var compCheck = {
        title: '标题未定义',
        inorout: '消费或者支出？',
        type: '类型未填写',
        money: '金额未填写'
        //desc: '描述未填写' //这个地方可以不填'
    };
    var x;
    for( x in compCheck){
        if(check[x] == '') {
            return callback({
                error: x,
                msg : compCheck[x]
            });
            break ;
        }
    }
    return callback(null, true);
};
