'use strict';

angular.module('nova').filter('filtersByFeeds', function () {
    return function (items, selectedFeeds) {
        if (typeof selectedFeeds === 'undefined') {
            return items;
        }
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (typeof selectedFeeds[item.feedId] === 'undefined') {
                filtered.push(item);
            }
        }
        return filtered;
    };
});

angular.module('nova').controller('MainCtrl', function ($scope, $http, apiEndPoint, Pagination) {

    $scope.title = 'Planet';
    $scope.googleAnalyticsIdentifier = 'UA-27208964-20';

    $scope.postsPagination = new Pagination();

    $http.get(apiEndPoint + '/feeds').success(function (response) {
        $scope.feeds = response.data;
    });

    $scope.removePost = function (position) {
        $scope.postsPagination.items.splice(position, 1);
    };

    $scope.toggleFeed = function(feedId) {
        if (typeof $scope.selectedFeeds === 'undefined') {
            $scope.selectedFeeds = [];
            $scope.selectedFeeds[feedId] = feedId;
        } else {
            if (typeof $scope.selectedFeeds[feedId] === 'undefined') {
                $scope.selectedFeeds[feedId] = feedId;
            } else {
                $scope.selectedFeeds.splice(feedId,1);
            }
        }
    };

    $scope.resetFiltersOnFeeds = function() {
        $scope.selectedFeeds = undefined;
    };

    $scope.isFeedSelected = function(feedId) {
        if (typeof $scope.selectedFeeds === 'undefined') {
            return true;
        }
        return typeof $scope.selectedFeeds[feedId] === 'undefined';
    };

});