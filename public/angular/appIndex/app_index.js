/*
 * angular 首页入口文件
 */
var accountIndex = angular.module('accountIndex', ['ui.router']);
accountIndex.config(
    //设置路由
    function($stateProvider, $urlRouterProvider) {
        //默认路由
        $urlRouterProvider.otherwise("/index");

        $stateProvider.state('/index', {
            url: '/index',
            templateUrl: "public/angular/appIndex/tpl/index.html"
        });
    }
);