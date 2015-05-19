FuckBook.controller("EditProfileController", function ($scope, editProfileService, $location) {

    $scope.changePassword = function () {
        editProfileService.changePassword($scope.changePasswordData)
            .then(function(data){
                console.log(data);
            }, function(error) {
                console.log(error);
            });
        $location.path('/home');
    };

});