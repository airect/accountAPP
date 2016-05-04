/**
 * the controller of user setting router
 */
var setting = angular.module('user_setting', ['ngRoute']);
setting.config(function($routeProvide) {
    $routeProvide.when('/avatar',{
        templateUrl: '/user/setting'
    } )
});
