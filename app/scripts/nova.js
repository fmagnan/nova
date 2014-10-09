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

angular.module('nova').controller('NovaController', function ($scope, settings, localStorageService) {
    $scope.settings = settings;

    $scope.resetFiltersOnFeeds = function () {
        $scope.selectedFeeds = [];
    };

    // local storage
    var selectedFeedsInStore = localStorageService.get('selectedFeeds');
    $scope.selectedFeeds = selectedFeedsInStore && selectedFeedsInStore || [];
    $scope.$watch('selectedFeeds', function () {
        localStorageService.add('selectedFeeds', $scope.selectedFeeds);
    }, true);

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