FuckBook.factory('loginRegisterServices', function ($http, $q) {
    var serviceUrl = "http://softuni-social-network.azurewebsites.net/api/users/";
    var service = {};

    service.register = function (registerData) {
        var defer = $q.defer();
        $http.post(serviceUrl + "register", registerData)
            .success(function (data) {
                defer.resolve(data);
            }).error(function (error) {
                defer.reject(error);
            });
        return defer.promise;
    };

    service.login = function (loginData) {
        var defer = $q.defer();
        $http.post(serviceUrl + "login", loginData)
            .success(function (data) {
                defer.resolve(data);
            }).error(function (error) {
                defer.reject(error);
            });
        return defer.promise;
    };

    service.logout = function () {
        var defer = $q.defer();
        $http.post(serviceUrl + "logout")
            .success(function (data) {
                sessionStorage.clear();
                $http.defaults.headers.common = {};
                defer.resolve(data);
            }).error(function (error) {
                defer.reject(error);
            });
        return defer.promise;
    };

    service.setCredentials = function (data) {
        sessionStorage['accessToken'] = data.access_token;
        sessionStorage['username'] = data.userName;
    };

    return service;
});