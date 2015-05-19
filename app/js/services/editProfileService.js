FuckBook.factory('editProfileService', function ($http, $q) {
    var serviceUrl = "http://softuni-social-network.azurewebsites.net/api/me/changepassword";
    var service = {};

    service.changePassword = function (changePasswordData) {
        var defer = $q.defer();
        $http.defaults.headers.common = GetHeaders();
        $http.put(serviceUrl, changePasswordData)
            .success(function (data) {
                console.log(changePasswordData);
                defer.resolve(data);
            }).error(function (error) {
                console.log(changePasswordData);
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