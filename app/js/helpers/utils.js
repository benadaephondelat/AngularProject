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

    FuckBook.showErrorMessage = showErrorMessage;
    FuckBook.showSuccessMessage = showSuccessMessage;
})();