'use strict';

angular.module('nova').filter('filtersByFeeds', function () {
    return function (items, selectedFeeds) {
        if (selectedFeeds.length === 0) {
            return items;
        }
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (selectedFeeds.indexOf(item.feedId) === -1) {
                filtered.push(item);
            }
        }
        return filtered;
    };
});

angular.module('nova').controller('MainCtrl', function ($scope, $http, apiEndPoint, Pagination) {

    $scope.removePost = function (position) {
        $scope.postsPagination.items.splice(position, 1);
    };

    $scope.toggleFeed = function (feedId) {
        var position = $scope.selectedFeeds.indexOf(feedId);
        if (position === -1) {
            $scope.selectedFeeds.push(feedId);
        } else {
            $scope.selectedFeeds.splice(position, 1);
        }
    };

    $scope.resetFiltersOnFeeds = function () {
        $scope.selectedFeeds = [];
    };

    $scope.isFeedSelected = function (feedId) {
        return $scope.selectedFeeds.indexOf(feedId) === -1;
    };

    $scope.title = 'Planet';
    $scope.googleAnalyticsIdentifier = 'UA-27208964-20';

    $scope.resetFiltersOnFeeds();

    $scope.postsPagination = new Pagination();

    $http.get(apiEndPoint + '/feeds').success(function (response) {
        $scope.feeds = response.data;
    });

});