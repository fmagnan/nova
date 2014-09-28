'use strict';

novaApp.factory('Pagination', function ($http, apiEndPoint) {
    var Pagination = function () {
        this.items = [];
        this.busy = false;
        this.params = {"limit": 10, "offset": 0};
    };

    Pagination.prototype.build_http_query_params = function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };

    Pagination.prototype.get = function (conditions, isResetNeeded) {
        if (this.busy) {
            return;
        }
        this.busy = true;

        if (true === isResetNeeded) {
            this.items = [];
            this.params.offset = 0;
        }

        if (typeof conditions !== 'undefined') {
            for (var key in conditions) {
                this.params[key] = conditions[key];
            }
        }

        var url = apiEndPoint + "/posts?" + this.build_http_query_params(this.params);
        $http.get(url).success(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                this.items.push(response.data[i]);
            }
            this.params.offset = this.items.length;
            this.busy = false;
        }.bind(this));
    };

    return Pagination;
});

novaApp.controller('MainCtrl', function ($scope, $http, apiEndPoint, Pagination) {

    $scope.postsPagination = new Pagination();

    $http.get(apiEndPoint + '/feeds').success(function (response) {
        $scope.feeds = response.data;
    });
});

