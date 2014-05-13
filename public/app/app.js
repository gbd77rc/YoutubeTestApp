angular.module("app", ['ngResource', 'ngRoute']);

angular.module("app")
    .config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/',{
                templateUrl:"/partials/main",
                controller:"mainCtrl"
            });
    }]);

angular.module("app").controller('mainCtrl', function($scope){
    $scope.myVar = "YouTube Player Here";
})