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

angular.module('nova').controller('MainController', function ($scope, $http, settings, Pagination, localStorageService) {
    //functions
    $scope.removePost = function (id) {
        for (var i = 0; i < $scope.postsPagination.items.length; i++) {
            if ($scope.postsPagination.items[i].id === id) {
                return $scope.postsPagination.items.splice(i, 1);
            }
        }
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

    // local storage
    var selectedFeedsInStore = localStorageService.get('selectedFeeds');
    $scope.selectedFeeds = selectedFeedsInStore && selectedFeedsInStore || [];
    $scope.$watch('selectedFeeds', function () {
        localStorageService.add('selectedFeeds', $scope.selectedFeeds);
    }, true);

    // init
    $scope.postsPagination = new Pagination();

    $http.get(settings.apiEndPoint + 'feeds').success(function (response) {
        $scope.feeds = response.data;
    });

});