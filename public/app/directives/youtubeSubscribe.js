/**
 * Created by gbd77rc on 14/05/2014.
 */

angular.module('app')
    .directive('ytsubscribe',['$window', '$log', function($window, $log){
        return {
            restrict: 'E',
            replace:true,
            scope:{
                subscriber: "@"
            },
            template: "<div id='yt-button-container-render' style='display:inline'></div>",

            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, element, attrs, controller) {
                        $log.info('youtubeSubscribe - Pre -' + scope.subscriber);
                        scope.$watch('subscriber', function(newVal) {
                            if ( newVal != undefined ) {
                                scope.subscriber = newVal;
                            }
                        });
                    },
                    post: function postLink(scope, element, attrs, controller) {
                        $log.info('youtubeSubscribe - Post -'  + scope.subscriber);

                        var ytYoutubeEvent = function(){
                            $log.info("Youtube Subscribe event fired!");
                        }

                        scope.$watch('subscriber', function(newVal) {
                            if ( newVal != undefined ) {
                                scope.url = newVal;

                                if (  $window.gapi != undefined){
                                    var params = {
                                        "channel": scope.subscriber,
                                        "layout": "default",
                                        "onytevent": ytYoutubeEvent
                                    };
                                    var container = document.getElementById('yt-button-container-render');
                                    $window.gapi.ytsubscribe.render(
                                        container,
                                        params
                                    )
                                }
                            }
                        });
                    }
                }
            }
        }
    }]);