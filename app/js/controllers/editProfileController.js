FuckBook.controller("EditProfileController", function ($scope, $location, editProfileService, notificationsService, spinner) {

    $scope.changePassword = function () {
        spinner.start();
        editProfileService.changePassword($scope.changePasswordData)
            .then(function(data){
               FuckBook.showSuccessMessage('Password successfully changed!', notificationsService);
            }, function(error) {
                FuckBook.showErrorMessage(error, notificationsService);
                console.log(error);
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
                console.log(error);
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
                console.log(error);
            }).finally(function () {
                spinner.stop();
            });
    };

    $scope.uploadProfilePicture = function () {
        selectFile("profilePicture", "profilePicturePreview");
    };

    $scope.uploadCoverPicture = function () {
        selectFile("coverPicture", "coverPicturePreview");
    };

    function selectFile(inputSelector, picturePreview){
        $('body').on('change', "#" + inputSelector, function() {
            var fileInput = document.getElementById(inputSelector);
            var file = fileInput.files[0];
            var reader = new FileReader();
            reader.onload = function () {
                var targetSource = document.getElementById(picturePreview);
                targetSource.src = reader.result;
                if(inputSelector == "profilePicture"){
                    $scope.editData.profileImageData = targetSource.src;
                }
                else{
                    $scope.editData.coverImageData = targetSource.src;
                }
            };

            reader.readAsDataURL(file);
        });
    }
});