'use strict';

angular.module('nova').filter('includesInFeed', function () {
    return function (items, feedIdFilter) {
        if (typeof feedIdFilter === 'undefined') {
            return items;
        }
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            console.log(feedIdFilter+ ' vs ' + item.feedId + ' / ' + item.title );
            if (item.feedId == feedIdFilter) {
                filtered.push(item);
            }
        }
        return filtered;
    }
});

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

    $scope.selectFeed = function(feedId) {
        $scope.feedIdFilter = feedId;
    };

    $scope.removeFeedFilter = function() {
        $scope.feedIdFilter = undefined;
    };

});