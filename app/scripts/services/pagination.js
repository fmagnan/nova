'use strict';

angular.module('nova').factory('Pagination', function ($http, settings) {
    var Pagination = function () {
        this.items = [];
        this.isLoading = false;
        this.offset = 0;
        this.hasNext = true;
    };

    Pagination.prototype.get = function () {
        if (this.isLoading) {
            return;
        }
        this.isLoading = true;

        var url = settings.apiEndPoint + '/posts?limit=10&offset=' + this.offset;
        $http.get(url).success(function (response) {
            if (0 === response.data.length) {
                this.isLoading = true;
                this.hasNext = false;
            } else {
                for (var i = 0; i < response.data.length; i++) {
                    this.items.push(response.data[i]);
                }
                this.offset = this.items.length;
                this.isLoading = false;
            }
        }.bind(this));
    };

    return Pagination;
});