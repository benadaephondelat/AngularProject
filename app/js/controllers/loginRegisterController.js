FuckBook.controller("LoginRegisterController", function ($scope, $location, $http, loginRegisterServices, notificationsService, spinner) {
    $http.defaults.headers.common = FuckBook.getHeaders();

    $scope.loginUser = function () {
        spinner.start();
        loginRegisterServices.login($scope.loginData)
            .then(function(data){
                loginRegisterServices.setCredentials(data);
                $location.path('/home');
                FuckBook.showSuccessMessage('Successfully logged in', notificationsService);
            }, function (error) {
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            });
    };

    $scope.registerUser = function () {
        spinner.start();
        loginRegisterServices.register($scope.registerData)
            .then(function(data){
                loginRegisterServices.setCredentials(data);
                $location.path('/home');
                FuckBook.showSuccessMessage('Successfully registered', notificationsService);
            }, function(error) {
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            });
    };

    $scope.logoutUser = function() {
        spinner.start();
        loginRegisterServices.logout()
            .then(function(data) {
                sessionStorage.clear();
                $location.path('#/');
                FuckBook.showSuccessMessage('Goodbye!', notificationsService);
            }, function(error) {
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            });
    };

});