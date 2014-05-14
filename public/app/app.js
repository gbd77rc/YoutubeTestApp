
angular.module("app", ['ngResource', 'ngRoute']);

angular.module("app")
    .config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/',{
                templateUrl:"/partials/main/main",
                controller:"mvMainCtrl"
            });
    }]);

angular.module('app')
    .config(['$sceDelegateProvider', function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self', 'https://*.youtube.com/**', 'http://*.youtube.com/**'
        ]);
    }]);
