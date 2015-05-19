FuckBook.controller('HomePageController', function ($scope, loginRegisterServices) {

    $scope.username = sessionStorage['username'];

    $scope.logout = function(){
        loginRegisterServices.Logout()
            .then(function(data){
                console.log(data);
            }, function(err){
                console.log(err);
            })
    }

});