FuckBook.factory('loginRegisterServices', function ($http, $q) {
    var serviceUrl = "http://softuni-social-network.azurewebsites.net/api/users/";
    var service = {};

    service.Register = function (registerData) {
        var defer = $q.defer();
        $http.post(serviceUrl + "register", registerData)
            .success(function (data) {
                defer.resolve(data);
            }).error(function (error) {
                defer.reject(error);
            });
        return defer.promise;
    };

    service.Login = function (loginData) {

        var defer = $q.defer();
        $http.post(serviceUrl + "login", loginData)
            .success(function (data) {
                defer.resolve(data);
            }).error(function (error) {
                defer.reject(error);
            });
        return defer.promise;
    };

    service.Logout = function () {

        var defer = $q.defer();
        $http.defaults.headers.common = GetHeaders();
        $http.post(serviceUrl + "logout")
            .success(function (data) {
                defer.resolve(data);
            }).error(function (error) {
                defer.reject(error);
            });
        return defer.promise;
    };

    service.SetCredentials = function (data) {
        sessionStorage['accessToken'] = data.access_token;
        sessionStorage['username'] = data.userName;
    };

    function GetHeaders() {
        return {
            'Authorization': 'Bearer ' + sessionStorage['accessToken']
        };
    }

    return service;
});