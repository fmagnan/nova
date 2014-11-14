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
    function link(scope, element, attrs) {


        angular.element($window).bind('scroll', function () {

            //changeColor();
           // var newOffset = parseInt(this.pageYOffset) + 100;

            //console.log(this);

            var scrollTop = this.pageYOffset;
            var scrollBottom = scrollTop + this.outerHeight;

            var post = element.parent().parent()[0];

            //console.log($window);

            //console.log(post);

            //var elemTop = post.offsetTop;
            var postTop = post.getBoundingClientRect().top;
            var postBottom = postTop + post.offsetHeight;

            console.log('window ' + scrollTop + ' => ' + scrollBottom + ', post ' + postTop + ' => ' + postBottom);

            var newOffset;

            if (postBottom > scrollBottom && postTop < scrollTop) {
                //console.log('le post est trop grand');
                newOffset = 200 + scrollTop;
                element.css({top: newOffset});
                scope.$apply();
            } else if (postBottom > scrollBottom) {
                console.log('le bas du post est cache');
                newOffset = postTop + 100;
                element.css({top: newOffset});
                scope.$apply();
            } else if (postTop < scrollTop) {
                console.log('le haut du post est cache');
                newOffset = postBottom - 100;
                element.css({top: newOffset});
                scope.$apply();
            }

        });

        /*       scope.$watch(attrs.offset, function (value) {
         changeColor(Math.floor(Math.random() * 16777215).toString(16));
         });

         $window.scroll

         element.on('$destroy', function () {
         //$interval.cancel(timeoutId);
         });

         // start the UI update process; save the timeoutId for canceling
         /*timeoutId = $interval(function() {
         updateTime(); // update DOM
         }, 1000);*/
    }

    return {
        link: link
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