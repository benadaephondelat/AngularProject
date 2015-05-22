FuckBook.controller("LoginRegisterController", function ($scope, loginRegisterServices, $location, notificationsService) {

    $scope.loginUser = function () {
        loginRegisterServices.Login($scope.loginData)
            .then(function(data){
                loginRegisterServices.SetCredentials(data);
                $location.path('/home');
                notificationsService.success('Successfully logged in');
            }, function (error) {
                notificationsService.error(error.error_description);
                console.log(error);
            });
    };

    $scope.registerUser = function () {
        loginRegisterServices.Register($scope.registerData)
            .then(function(data){
                loginRegisterServices.SetCredentials(data);
                $location.path('/home');
                notificationsService.success('Successfully registered');
            }, function(error) {
                notificationsService.error(error.error_description);
                console.log(error);
            });
    };

    $scope.logoutUser = function() {
        loginRegisterServices.Logout()
            .then(function(data) {
                sessionStorage.clear();
                $location.path('#/');
                notificationsService.success('Goodbye!');
            }, function(error) {
                console.log(error);
                notificationsService.error(error.error_description);
            });
    };

});