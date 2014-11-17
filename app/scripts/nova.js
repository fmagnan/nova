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

    $scope.buildFeeds = function (response) {
        $scope.feeds = response.data;
    };

    $scope.resetFiltersOnFeeds = function (response) {
        $scope.selectedFeeds = [];
        if (typeof response !== 'undefined') {
            $scope.feeds = response.data;
        }
        for (var i = 0; i < $scope.feeds.length; i++) {
            $scope.selectedFeeds.push($scope.feeds[i].id);
        }
    };

    $scope.toggleFeed = function (feedId) {
        var position = $scope.selectedFeeds.indexOf(feedId);
        if (position !== -1) {
            $scope.selectedFeeds.splice(position, 1);
        } else {
            $scope.selectedFeeds.push(feedId);
        }
    };

    $scope.isFeedSelected = function (feedId) {
        return $scope.selectedFeeds && $scope.selectedFeeds.indexOf(feedId) !== -1;
    };

    $scope.$watch('selectedFeeds', function () {
        localStorageService.add('selectedFeeds', $scope.selectedFeeds);
    }, true);

    var selectedFeedsInStore = localStorageService.get('selectedFeeds');
    if (selectedFeedsInStore) {
        $scope.selectedFeeds = selectedFeedsInStore;
        $http.get(settings.apiEndPoint + 'feeds').success($scope.buildFeeds);
    } else {
        $http.get(settings.apiEndPoint + 'feeds').success($scope.resetFiltersOnFeeds);
    }

}).directive('novaSticky', ['$window', function ($window) {

    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            var post = element.parent().parent()[0];
            var initialPosition = post.getBoundingClientRect().top;

            var relocate = function (element, position) {
                element.css({top: position});
                scope.$apply();
            };

            //console.log(initialPosition);

            angular.element($window).bind('scroll', function () {
                var scrollTop = this.scrollY;
                var scrollBottom = scrollTop + this.innerHeight;
                var postDimensions = post.getBoundingClientRect();
                var postBottom = initialPosition + postDimensions.height;
                var futurePosition = scrollTop - initialPosition + 100;

                //  console.log( post.getBoundingClientRect());

                var info = 'fenetre ' + scrollTop + ' -> ' + scrollBottom + ', post ' + initialPosition + ' -> ' + postBottom + ', position ' + futurePosition;
                if (initialPosition < scrollTop && postBottom > scrollBottom) {
                    // le post déborde en haut et en bas
                    console.log('le post deborde en haut et en bas ' + info);
                    relocate(element, futurePosition);
                } else if (initialPosition < scrollTop && futurePosition < (postDimensions.height - 100)) {
                    // le post déborde en haut
                    console.log('le post deborde juste en haut ' + info);
                    relocate(element, futurePosition);
                } else if (postBottom > scrollBottom && futurePosition > (initialPosition + 100)) {
                    // le post déborde en bas
                    console.log('le post deborde juste en bas ' + info);
                    relocate(element, futurePosition);
                } else if (initialPosition > scrollTop && postBottom < scrollBottom) {
                    // le post est compris dans la fenetre de scrolling
                    console.log('le post est inclus ' + info);
                    relocate(element, futurePosition);
                }

            });
        }
    };
}]);

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