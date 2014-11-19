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
            var $window = angular.element(window);

            var body = document.getElementsByTagName('body')[0];
            var canvas = document.createElement('div');
            canvas.setAttribute('class', 'canvas');
            canvas.setAttribute('id', 'canvas-' + attrs.itemid);
            canvas.innerHTML = '&nbsp;';
            canvas.style.top = "125px";
            canvas.style.left = "0px";
            body.appendChild(canvas);

            var move = function (widget, position) {
                widget.css({top: position});
                scope.$apply();
            };

            var isPostOverflowOnTopAndBottom = function (absolutePosition, scrollTop, postBottom, scrollBottom) {
                return absolutePosition < scrollTop && postBottom > scrollBottom;
            };

            var isPostOverflowOnlyOnTop = function (absolutePosition, scrollTop, futurePosition, absoluteHeight, offset) {
                return absolutePosition < scrollTop && futurePosition < (absoluteHeight - offset);
            };

            var isPostOverflowOnlyOnBottom = function (postBottom, scrollBottom, futurePosition, absolutePosition, offset) {
                return postBottom > scrollBottom && futurePosition > (absolutePosition + offset);
            };

            var foobar = function () {

                var offset = parseInt(attrs.offset);

                var bodyRect = document.body.getBoundingClientRect(),
                    post = element[0],
                    postRect = post.getBoundingClientRect(),
                    absolutePosition = postRect.top - bodyRect.top,
                    absoluteHeight = postRect.height,
                    widget = element.find('.actions'),
                    scrollTop = this.scrollY,
                    scrollBottom = scrollTop + this.innerHeight,
                    postBottom = absolutePosition + absoluteHeight,
                    futurePosition = scrollTop - absolutePosition + offset;

                var itemid = post.attributes.getNamedItem('itemid').value;
                var boundCanvas = document.getElementById('canvas-' + itemid);
                boundCanvas.style.top = absolutePosition + "px";

                if (isPostOverflowOnTopAndBottom(absolutePosition, scrollTop, postBottom, scrollBottom) ||
                    isPostOverflowOnlyOnTop(absolutePosition, scrollTop, futurePosition, absoluteHeight, offset) ||
                    isPostOverflowOnlyOnBottom(postBottom, scrollBottom, futurePosition, absolutePosition, offset)) {
                    move(widget, futurePosition);
                }
            };

            $window.on('scroll', foobar);
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