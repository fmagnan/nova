'use strict';

// Reddit constructor function to encapsulate HTTP and pagination logic
novaApp.factory('Reddit', function($http) {
    var Reddit = function() {
        this.items = [];
        this.busy = false;
        this.after = '';
    };

    Reddit.prototype.next = function() {
        if (this.busy) return;
        this.busy = true;

        var url = "http://galactus.local.guest.net/api/posts?limit=10&offset=" + this.after;
        $http.get(url).success(function(response) {
            var posts = response.data;
            for (var i = 0; i < posts.length; i++) {
                this.items.push(posts[i]);
            }
            this.after = this.items.length;
            this.busy = false;
        }.bind(this));
    };

    return Reddit;
});

novaApp.controller('MainCtrl', function ($scope, $http, apiEndPoint, Reddit) {

    $scope.reddit = new Reddit();

    $scope.generateColor = function (i) {
        return 220 - 10 * i;
    };

    $scope.filters = {};

    /*$http.get(apiEndPoint + '/posts?limit=10').success(function (response) {
        $scope.posts = response.data;
    });*/

    $http.get(apiEndPoint + '/feeds').success(function (response) {
        var feeds = response.data;
        $scope.feeds = {};
        for (var i= 0 ; i < feeds.length; i++) {
            $scope.feeds[feeds[i].id] = feeds[i];
            $scope.feeds[feeds[i].id]['color'] = $scope.generateColor(i);
        }
    });
});

