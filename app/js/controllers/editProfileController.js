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

    $scope.getUserData = function() {
        editProfileService.getUserData()
            .then(function(data) {
                $scope.editData = data;
            }, function (error) {
                console.log(error);
            });
    };

    $scope.editProfile = function() {
        editProfileService.editProfile($scope.editData)
            .then(function (data) {
                console.log(data);
            }, function (error) {
                console.log(error);
            })
    }

});