/**
 * angular 用户中心入口
 */

angular.module('account.user', [
    'ui.router'
])
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('user', {
                absolute: true,
                url: '/user',
                templateUrl: 'public/angular/tpl/user/index.html'
            })
            /* 用户中心 */
            .state('user.index', {
                url: '/',
                views: {
                    'add-btn': {
                        templateUrl: 'public/angular/tpl/user/index/add_btn.html'
                    },
                    'trend': {
                        templateUrl: 'public/angular/tpl/user/index/trend.html'
                    },
                    'checklist': {
                        templateUrl: 'public.angular/tpl/user/index/check_list.html'
                    }
                }
            })
            /* 用户设置 */
            .state('user.setting', {
                url: '/setting',
                templateUrl: 'public/angular/tpl/user/setting.html'
            })
            .state('user.setting.profile', {
                url: '',
                templateUrl: 'public/angular/tpl/user/setting/profile.html'
            })
            .state('user.setting.avatar', {
                url: '/avatar',
                templateUrl: 'public/angular/tpl/user/setting/avatar.html'
            })
            .state('user.setting.addtype', {
                url: '/addtype',
                templateUrl: 'public/angular/tpl/user/setting/addtype.html'
            });
}]);

