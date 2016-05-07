/*
 * angular 用户中心入口
 */
var accountUser = angular.module('accountUser', ['ui.router']);
accountUser.config(
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');
        $stateProvider.state('/index', {
            url: '/index',
            templateUrl: 'public/angular/appUser/tpl/index.html'
        });
    }
);
