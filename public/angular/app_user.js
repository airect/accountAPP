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
                //url: '/',
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
                templateUrl: 'public/angular/tpl/user/setting/profile.html',
                controller: function (profile, $scope, $http) {

                    $scope.username = profile.username;
                    $scope.sex      = profile.sex;
                    $scope.email    = profile.email;

                    $scope.updateProfile = function () {
                        $http.post('/setting/update_profile', {
                            username: $scope.username,
                            sex: $scope.sex,
                            email: $scope.email
                        })
                            .then(function (resp) {
                            if (resp.data.status == 200 ) {

                            } else {

                            }
                        }, function () {

                        });
                    }
                },
                resolve: {
                    profile: function (profileService) {
                        return profileService.getAll();
                    }
                }
            })
            .state('user.setting.avatar', {
                url: '/avatar',
                templateUrl: 'public/angular/tpl/user/setting/avatar.html'
            })
            .state('user.setting.check_type', {
                url: '/check_type',
                templateUrl: 'public/angular/tpl/user/setting/check_type.html',
                controller: 'getCheckTypes',
                resolve: {
                    check_types: function (checkTypesService) {
                        var s = checkTypesService.getAll();
                        console.log('resolve finished');
                        console.log(s);
                        return s;
                    },
                }
            });
}]);

