
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

angular.module('app').run(['$window', '$log', function($window, $log){
    $window.loadYoutubeScriptIfRequired = function(){
        $log.info('loading Youtube Script....');
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var alreadyLoaded = false;
        $("script").each(function() {
            if( this.src == tag.src ) {
                alreadyLoaded = true;
            }
        });

        if ( alreadyLoaded === false) {
            var firstTagScript = document.getElementsByTagName('script')[0];
            firstTagScript.parentNode.insertBefore(tag, firstTagScript);
        }
        return alreadyLoaded;
    };
    $window.loadYoutubeScriptIfRequired();
}]);


