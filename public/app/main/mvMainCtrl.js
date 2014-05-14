angular.module("app").controller('mvMainCtrl', function($scope){
    $scope.vm = {};
    $scope.vm.selectedVideo = {
        video_src : "http://www.youtube.com/embed/WBeFfWUdseI?feature=player_embedded&autoplay=0&rel=0&enablejapi=1&autohide=1",
        video_id : "WBeFfWUdseI",
        video_img : "http://img.youtube.com/vi/WBeFfWUdseI/0.jpg"
    };
});