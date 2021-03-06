FuckBook.controller("EditProfileController", function ($scope, $location, $http, spinner, editProfileService, notificationsService) {

    $http.defaults.headers.common = FuckBook.getHeaders();
    $scope.changePassword = function () {
        spinner.start();
        editProfileService.changePassword($scope.changePasswordData)
            .then(function(data){
               FuckBook.showSuccessMessage('Password successfully changed!', notificationsService);
            }, function(error) {
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            });
    };

    $scope.getUserData = function() {
        spinner.start();
        editProfileService.getUserData()
            .then(function(data) {
                $scope.editData = data;
            }, function (error) {

            }).finally(function () {
                spinner.stop();
            });
    };

    $scope.editProfile = function() {
        spinner.start();
        editProfileService.editProfile($scope.editData)
            .then(function (data) {
                FuckBook.showSuccessMessage('Profile successfully edited.', notificationsService);
            }, function (error) {
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            });
    };

    $scope.uploadProfilePicture = function () {
        FuckBook.selectFile("profilePicture", "profilePicturePreview", $scope);
    };

    $scope.uploadCoverPicture = function () {
        FuckBook.selectFile("coverPicture", "coverPicturePreview", $scope);
    };
});