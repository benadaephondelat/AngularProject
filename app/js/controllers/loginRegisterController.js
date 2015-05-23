FuckBook.controller("LoginRegisterController", function ($scope, $location, loginRegisterServices, notificationsService, spinner) {

    $scope.loginUser = function () {
        spinner.start();
        loginRegisterServices.Login($scope.loginData)
            .then(function(data){
                loginRegisterServices.SetCredentials(data);
                $location.path('/home');
                FuckBook.showSuccessMessage('Successfully logged in', notificationsService);
            }, function (error) {
                FuckBook.showErrorMessage(error, notificationsService);
                console.log(error);
            }).finally(function () {
                spinner.stop();
            });
    };

    $scope.registerUser = function () {
        spinner.start();
        loginRegisterServices.Register($scope.registerData)
            .then(function(data){
                loginRegisterServices.SetCredentials(data);
                $location.path('/home');
                FuckBook.showSuccessMessage('Successfully registered', notificationsService);
            }, function(error) {
                FuckBook.showErrorMessage(error, notificationsService);
                console.log(error);
            }).finally(function () {
                spinner.stop();
            });
    };

    $scope.logoutUser = function() {
        spinner.start();
        loginRegisterServices.Logout()
            .then(function(data) {
                sessionStorage.clear();
                $location.path('#/');
                FuckBook.showSuccessMessage('Goodbye!', notificationsService);
            }, function(error) {
                console.log(error);
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            });
    };

});