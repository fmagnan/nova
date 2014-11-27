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
    'LocalStorageModule',
    'ngDialog'
]);

angular.module('nova').config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('ls');
}]);

angular.module('nova').controller('NovaController', function ($scope, $http, settings, localStorageService, ngDialog) {
    $scope.settings = settings;

    $scope.openAddFeedPopin = function () {
        ngDialog.open({template: 'partials/forms/add-feed.html', controller: 'NovaController'});
    };

    $scope.addFeed = {};
    $scope.addFeed.url = '';
    $scope.addFeed.submit = function () {
        console.log($scope.addFeed);
    };

    $scope.buildFeeds = function (response) {
        $scope.feeds = response.data;
    };

    $scope.baseUri = function (fullUrl) {
        var parser = document.createElement('a');
        parser.href = fullUrl;
        return parser.protocol + '//' + parser.hostname;
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
    var feedsApiEndPoint = settings.apiEndPoint + 'feeds?code=' + settings.code;
    if (selectedFeedsInStore) {
        $scope.selectedFeeds = selectedFeedsInStore;
        $http.get(feedsApiEndPoint).success($scope.buildFeeds);
    } else {
        $http.get(feedsApiEndPoint).success($scope.resetFiltersOnFeeds);
    }

}).directive('novaSticky', ['$window', function ($window) {

    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            var $window = angular.element(window),
                debug = false;

            var addHorizontalLine = function (place) {
                var body = document.getElementsByTagName('body')[0];
                var line = document.createElement('div');
                line.setAttribute('class', 'canvas');
                line.setAttribute('id', place + '-canvas-' + attrs.itemid);
                line.innerHTML = '&nbsp;';
                line.style.top = '125px';
                line.style.left = '0px';
                line.style.background = 'red';
                line.style.padding = '0px';
                line.style.margin = '0px';
                line.style.width = '100%';
                line.style.height = '1px';
                line.style.position = 'absolute';
                body.appendChild(line);
                return line;
            };

            if (debug) {
                var topLine = addHorizontalLine('top');
                var bottomLine = addHorizontalLine('bottom');
            }

            var move = function (widget, position) {
                widget.css({top: position});
                scope.$apply();
            };

            var isPostOverflowOnTopAndBottom = function (postTop, scrollTop, postBottom, scrollBottom) {
                return postTop < scrollTop && postBottom > scrollBottom;
            };

            var isPostOverflowOnlyOnTop = function (postTop, scrollTop, futurePosition, absoluteHeight, offset, widgetHeight) {
                return postTop < scrollTop && futurePosition < (absoluteHeight - offset - widgetHeight);
            };

            var isPostOverflowOnlyOnBottom = function (postBottom, scrollBottom, futurePosition, postTop, offset, widgetHeight) {
                return postBottom > scrollBottom && futurePosition > (postTop + offset + widgetHeight);
            };

            var foobar = function () {

                var offset = parseInt(attrs.offset);

                var bodyRect = document.body.getBoundingClientRect(),
                    post = element[0],
                    postRect = post.getBoundingClientRect(),
                    postTop = postRect.top - bodyRect.top,
                    absoluteHeight = postRect.height,
                    widget = element.find('.actions'),
                    scrollTop = this.scrollY,
                    scrollBottom = scrollTop + this.innerHeight,
                    postBottom = postTop + absoluteHeight,
                    futurePosition = scrollTop - postTop + offset,
                    widgetHeight = widget.height();

                if (debug) {
                    var itemid = post.attributes.getNamedItem('itemid').value;
                    var topBoundCanvas = document.getElementById('top-canvas-' + itemid);
                    topBoundCanvas.style.top = postTop + 'px';

                    var bottomBoundCanvas = document.getElementById('bottom-canvas-' + itemid);
                    bottomBoundCanvas.style.top = postBottom + 'px';
                }

                if (isPostOverflowOnTopAndBottom(postTop, scrollTop, postBottom, scrollBottom) ||
                    isPostOverflowOnlyOnTop(postTop, scrollTop, futurePosition, absoluteHeight, offset, widgetHeight) ||
                    isPostOverflowOnlyOnBottom(postBottom, scrollBottom, futurePosition, postTop, offset, widgetHeight)) {
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