var FuckBook = FuckBook || {};

(function () {

    var showErrorMessage = function(error, notificationsService) {
        if(error.error_description) {
            notificationsService.error(error.error_description);
        } else {
            notificationsService.error(error.message);
        }
    };

    var showSuccessMessage = function(message, notificationsService) {
        notificationsService.success(message);
    };

    var authorizationCheck = function($location) {
        if (!sessionStorage.getItem('accessToken')) {
            $location.path('/');
        }
    };

    var getHeaders = function() {
        return {
            'Authorization': 'Bearer ' + sessionStorage['accessToken']
        };
    };

    var selectFile = function(inputSelector, picturePreview, $scope){
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
    };

    FuckBook.showErrorMessage = showErrorMessage;
    FuckBook.showSuccessMessage = showSuccessMessage;
    FuckBook.authorizationCheck = authorizationCheck;
    FuckBook.getHeaders = getHeaders;
    FuckBook.selectFile = selectFile;
})();