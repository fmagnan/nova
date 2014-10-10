'use strict';

angular.module('nova').filter('filtersByFeeds', function () {
    return function (items, selectedFeeds) {
        var isFeedSelected = function (selectedFeeds) {
            return function (item) {
                return selectedFeeds && selectedFeeds.indexOf(item.feedId) !== -1;
            };
        };

        return items.filter(isFeedSelected(selectedFeeds));
    };
});

angular.module('nova').controller('MainController', function ($scope, $http, settings, Pagination) {
    //functions
    $scope.removePost = function (id) {
        for (var i = 0; i < $scope.postsPagination.items.length; i++) {
            if ($scope.postsPagination.items[i].id === id) {
                return $scope.postsPagination.items.splice(i, 1);
            }
        }
    };

    // init
    $scope.postsPagination = new Pagination();
});