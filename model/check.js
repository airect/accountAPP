/**
 * Created by Administrator on 2016/1/29.
 */
var mongo = require('./db');

function Check() {

}
module.exports = Check;
/**
 * 获取账单列表
 * @param {Object} check
 */
Check.getCheck = function(check, callback) {
    mongo.open(function(err, db) {
        if(err) return callback(err);
        db.collection('check' ,function(err, collection) {
            if(err) return callback(err);
            collection.find(check).toArray(function(err, items) {
                if(err) return callback(err);
                return callback(null, items);
            });
        });
    });
}
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
        all_class: '类型未填写',
        money_amount: '金额未填写',
        desc: '备注说明'
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
}
