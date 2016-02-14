/**
 * Created by airect on 2016/1/18.
 */
var setting = require('../setting.js');
var mongodb = require('mongodb'),
    server  = new mongodb.Server(setting.db.host,setting.db.port, {auto_reconnect:true}),
    conn    = new mongodb.Db(setting.db.dbname,server,{safe:true});
module.exports = conn;
