FuckBook.controller("LoginRegisterController", function ($scope, loginRegisterServices, $location) {

    $scope.loginUser = function () {
        loginRegisterServices.Login($scope.loginData)
            .then(function(data){
                loginRegisterServices.SetCredentials(data);
            });
        $location.path('/home');
    };

    $scope.registerUser = function () {
        loginRegisterServices.Register($scope.registerData)
            .then(function(data){
                loginRegisterServices.SetCredentials(data);
            });
        $location.path('/home');
    };

    $scope.logoutUser = function() {
        loginRegisterServices.Logout()
            .then(function(data) {
                console.log(data);
                sessionStorage.clear();
                $location.path('#/home');
            }, function(error) {
                console.log(error);
            });
        $location.path('/home');
    };

});