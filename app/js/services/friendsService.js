FuckBook.factory('friendsService', function ($http, $q) {
    var serviceUrl = "http://softuni-social-network.azurewebsites.net/api/me/friends";
    var service = {};

    service.getFriends = function () {
        var defer = $q.defer();
        $http.defaults.headers.common = GetHeaders();
        $http.get(serviceUrl)
            .success(function (data) {
                defer.resolve(data);
            }).error(function (error) {
                defer.reject(error);
            });
        return defer.promise;
    };

    function GetHeaders() {
        return {
            'Authorization': 'Bearer ' + sessionStorage['accessToken']
        };
    }

    return service;
});