'use strict';

angular.module('nova').controller('MainCtrl', function ($scope, $http, apiEndPoint, Pagination) {

    $scope.postsPagination = new Pagination();

    $http.get(apiEndPoint + '/feeds').success(function (response) {
        $scope.feeds = response.data;
    });

    $scope.removePost = function (position) {
        $scope.postsPagination.items.splice(position, 1);
    };

    $scope.getPosts = function () {
        console.log('get posts');
        return $scope.postsPagination.get();
    };

    $scope.selectFeed = function (feedId) {
        $scope.feedIdFilter = feedId;
        /*var i = $scope.postsPagination.items.length;
         while (i--) {
         if ($scope.postsPagination.items[i]['feedId'] != feedId) {
         $scope.postsPagination.items.splice(i, 1);
         }
         }*/
    };
});