/**
 * Created by gbd77rc on 14/05/2014.
 */
angular.module('app')
    .directive('ytplayer',['$window', function($window){
        return {
            restrict: 'E',
            replace:true,
            scope:{
                video: "=",
                width: "@",
                height: "@"
            },
            templateUrl: '/partials/directives/youtubeplayer',
            link: function(scope, elem, attrs){
                scope.videoItem = {
                    videoId : "",
                    width: "",
                    height: ""
                };

                scope.$watch(attrs.width, function(flag){
                    console.log('width has been updated. ' + flag);
                    scope.videoItem.width = flag;
                });
                scope.$watch(attrs.height, function(flag){
                    console.log('height has been updated. ' + flag);
                    scope.videoItem.height = flag;
                });

                scope.$watch('video', function(newVal){
                    console.log('video has been updated. ' + newVal);
                    scope.videoItem.videoId = newVal;
                });

                $window.loadScript = function(){
                    console.log('loading Youtube Script....');
                    var tag = document.createElement('script');
                    tag.src = "https://www.youtube.com/iframe_api";
                    var firstTagScript = document.getElementsByTagName('script')[0];
                    firstTagScript.parentNode.insertBefore(tag, firstTagScript);
                };

                $window.playOnReady = function(event){
                    console.log('Video is ready to play - ' + event.target);
                };

                $window.playOnChange = function(event){
                    console.log('Video state has changed! - ' + event.data);
                };

                var player;

                $window.onYouTubeIframeAPIReady = function(){

                    console.log("The Youtube iFrame Ready is called! - " + scope.videoItem.videoId);
                    player = new YT.Player('playerDiv',{
                        videoId: scope.videoItem.videoId,
                        width: scope.videoItem.width,
                        height: scope.videoItem.height,
                        playerVars: {
                            'autohide': 1,
                            'autoplay': 0,
                            'modestbranding': 1,
                            'rel': 0,
                            theme:'light'
                        },
                        events: {
                            'onReady': playOnReady,
                            'onStateChange': playOnChange
                        }
                    });
                };

                $window.loadScript();
            }
        }
    }]);