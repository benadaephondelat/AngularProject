FuckBook.factory('editProfileService', function ($http, $q) {
    var serviceUrl = "http://softuni-social-network.azurewebsites.net/api/me";
    var service = {};

    service.changePassword = function (changePasswordData) {
        var defer = $q.defer();
        $http.defaults.headers.common = GetHeaders();
        $http.put(serviceUrl + "/changepassword", changePasswordData)
            .success(function (data) {
                defer.resolve(data);
            }).error(function (error) {
                defer.reject(error);
            });
        return defer.promise;
    };

    service.getUserData = function() {
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

    service.editProfile = function(data) {
        var defer = $q.defer();
        $http.defaults.headers.common = GetHeaders();
        $http.put(serviceUrl, data)
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