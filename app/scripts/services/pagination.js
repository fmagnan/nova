'use strict';

angular.module('novaApp').factory('Pagination', function ($http, apiEndPoint) {
    var Pagination = function () {
        this.items = [];
        this.isLoading = false;
        this.params = {'limit': 10, 'offset': 0};
        this.hasNext = true;
    };

    Pagination.prototype.reset = function () {
        this.items = [];
        this.isLoading = false;
        this.params.offset = 0;
        this.hasNext = true;
    };

    Pagination.prototype.buildHttpQueryParams = function (obj) {
        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
        }
        return str.join('&');
    };

    Pagination.prototype.get = function (conditions, isResetNeeded) {
        if (true === isResetNeeded) {
            this.reset();
        }

        if (this.isLoading) {
            return;
        }
        this.isLoading = true;

        if (typeof conditions !== 'undefined') {
            for (var key in conditions) {
                this.params[key] = conditions[key];
            }
        }

        var url = apiEndPoint + '/posts?' + this.buildHttpQueryParams(this.params);
        $http.get(url).success(function (response) {
            if (0 === response.data.length) {
                this.isLoading = true;
                this.hasNext = false;
            } else {
                for (var i = 0; i < response.data.length; i++) {
                    this.items.push(response.data[i]);
                }
                this.params.offset = this.items.length;
                this.isLoading = false;
            }
        }.bind(this));
    };

    return Pagination;
});