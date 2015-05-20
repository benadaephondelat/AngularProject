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

    service.SearchByName = function (search) {
        var deferred = $q.defer();
        $http.defaults.headers.common = GetHeaders();
        $http.get("http://softuni-social-network.azurewebsites.net/api/users/search?searchTerm=" + search)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.getUserWall = function (userName) {
        var deferred = $q.defer();
        $http.defaults.headers.common = GetHeaders();
        $http.get("http://softuni-social-network.azurewebsites.net/api/users/" + userName)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.getMyFriends = function () {
        var deferred = $q.defer();
        $http.defaults.headers.common = GetHeaders();
        $http.get("http://softuni-social-network.azurewebsites.net/api/me/friends")
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    $http.defaults.headers.common = GetHeaders();
    service.getReceivedRequests = function () {
        var deferred = $q.defer();
        $http.get("http://softuni-social-network.azurewebsites.net/api/me/requests")
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.acceptFriendRequest = function (userId) {
        var deferred = $q.defer();
        $http.put("http://softuni-social-network.azurewebsites.net/api/me/requests/"+userId+"?status=approved")
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.rejectFriendRequest = function (userId) {
        var deferred = $q.defer();
        $http.put("http://softuni-social-network.azurewebsites.net/api/me/requests/"+userId+"?status=rejected")
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    function GetHeaders() {
        return {
            'Authorization': 'Bearer ' + sessionStorage['accessToken']
        };
    }

    return service;
});