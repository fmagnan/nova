'use strict';

angular.module('nova', [
    'config',
    'infinite-scroll',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
]);

angular.module('nova').config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('ls');
}]);

angular.module('nova').controller('NovaController', function ($scope, $http, settings, localStorageService) {
    $scope.settings = settings;

    $scope.resetFiltersOnFeeds = function () {
        $scope.selectedFeeds = [];
    };

    $scope.toggleFeed = function (feedId) {
        var position = $scope.selectedFeeds.indexOf(feedId);
        if (position === -1) {
            $scope.selectedFeeds.push(feedId);
        } else {
            $scope.selectedFeeds.splice(position, 1);
        }
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

    $http.get(settings.apiEndPoint + 'feeds').success(function (response) {
        $scope.feeds = response.data;
    });

});

angular.module('nova').config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/main.html',
            controller: 'MainController'
        })
        .otherwise({
            redirectTo: '/'
        });
});