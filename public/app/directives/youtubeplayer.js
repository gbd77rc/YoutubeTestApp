/**
 * Created by gbd77rc on 14/05/2014.
 */
angular.module('app')
    .directive('ytplayer',['$window', '$log', function($window, $log){
        return {
            restrict: 'E',
            replace:true,
            scope:{
                video: "=",
                width: "@",
                height: "@"
            },
            templateUrl: '/partials/directives/youtubeplayer',
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller)
                    {
                        $log.info('youtube pre - ' + scope.video);
                        scope.$watch('video', function(newVal) {
                            if ( newVal != undefined ) {
                                scope.video = newVal;
                                var playerElement = iElement.find('#youtubeplayer-temp')[0];
                                if (playerElement != undefined) {
                                    playerElement.id = 'youtubeplayer-' + scope.video;
                                }
                            }
                        });
                    },
                    post: function postLink(scope, iElement, iAttrs, controller)
                    {
                        scope.$watch(iAttrs.width, function(flag){
                            scope.width = flag;
                        });
                        scope.$watch(iAttrs.height, function(flag){
                            scope.height = flag;
                        });

                        scope.lastPlayed = "";
                        scope.$watch('video', function(newVal){
                            if ( newVal != undefined) {
                                if ( scope.video != undefined){
                                    // We have changed videos so lets forget the last played
                                    scope.lastPlayed = "";
                                    if (scope.player != undefined ){
                                        scope.player.cueVideoById(scope.video);
                                    } else {
                                        loadPlayer();
                                    }
                                }
                            }
                        });

                        var getVideoId = function(id){
                            var videoId = "";

                            if ( scope.player != undefined){
                                videoId = scope.player.getVideoData().video_id;
                                $log.info('Video Code Detected - ' + videoId);

                            }
                            return videoId;
                        }

                        var playOnReady = function(event){
                            var videoId = getVideoId();
                            // Check if we have the video id or not
                            if ( videoId !== ""){
                                $log.info('Player is ready for - ' + videoId);
                            }
                        };

                        var playOnChange = function(event){
                            var videoId = getVideoId();
                            // Check if we have the video id or not
                            if ( videoId !== ""){
                                $log.info('Video Status        - ' + event.data);
                                if ( event.data === 1) {// Only interested in playing
                                    // check if we have paused and then resumed
                                    if ( scope.lastPlayed !== videoId ) {
                                        var counter = 'YoutubePlayed-' + videoId
                                        $log.info("Video has started playing - " + videoId);
                                    }
                                }
                            }
                        };

                        scope.player = undefined;

                        var loadPlayer = function(){
                            if ( scope.video === ""){
                                return;
                            }

                            var id = 'youtubeplayer-'+ scope.video;

                            scope.player = new YT.Player(id,{
                                videoId: scope.video,
                                width: scope.width,
                                height: scope.height,
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
                        }

                        $window.onYouTubeIframeAPIReady = function(){
                            $log.info("Youtube iFrame Api Called us!");
                            loadPlayer();
                        };
                    }
                }
            }
        }
    }]);
