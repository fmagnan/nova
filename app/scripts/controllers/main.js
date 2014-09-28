'use strict';

novaApp.factory('Foo', function($http, apiEndPoint) {
    var Foo = function() {
        this.items = [];
        this.busy = false;
        this.offset = 0;
    };

    Foo.prototype.next = function() {
        if (this.busy) {
            return;
        }
        this.busy = true;

        var url = apiEndPoint + "/posts?limit=10&offset=" + this.offset;
        $http.get(url).success(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                this.items.push(response.data[i]);
            }
            this.offset = this.items.length;
            this.busy = false;
        }.bind(this));
    };

    return Foo;
});

novaApp.controller('MainCtrl', function ($scope, $http, apiEndPoint, Foo) {

    $scope.reddit = new Foo();

    $scope.generateColor = function (i) {
        return 220 - 10 * i;
    };

    $scope.filters = {};

    $http.get(apiEndPoint + '/feeds').success(function (response) {
        var feeds = response.data;
        $scope.feeds = {};
        for (var i= 0 ; i < feeds.length; i++) {
            $scope.feeds[feeds[i].id] = feeds[i];
            $scope.feeds[feeds[i].id]['color'] = $scope.generateColor(i);
        }
    });
});

