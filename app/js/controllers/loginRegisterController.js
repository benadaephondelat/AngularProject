FuckBook.controller("LoginRegisterController", function ($scope, loginRegisterServices, $location, notificationsService) {

    $scope.loginUser = function () {
        loginRegisterServices.Login($scope.loginData)
            .then(function(data){
                loginRegisterServices.SetCredentials(data);
                $location.path('/home');
                FuckBook.showSuccessMessage('Successfully logged in', notificationsService);
            }, function (error) {
                FuckBook.showErrorMessage(error, notificationsService);
                console.log(error);
            });
    };

    $scope.registerUser = function () {
        loginRegisterServices.Register($scope.registerData)
            .then(function(data){
                loginRegisterServices.SetCredentials(data);
                $location.path('/home');
                FuckBook.showSuccessMessage('Successfully registered', notificationsService);
            }, function(error) {
                FuckBook.showErrorMessage(error, notificationsService);
                console.log(error);
            });
    };

    $scope.logoutUser = function() {
        loginRegisterServices.Logout()
            .then(function(data) {
                sessionStorage.clear();
                $location.path('#/');
                FuckBook.showSuccessMessage('Goodbye!', notificationsService);
            }, function(error) {
                console.log(error);
                FuckBook.showErrorMessage(error, notificationsService);
            });
    };

});