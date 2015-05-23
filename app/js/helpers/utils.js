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

    var authorizationCheck = function(location) {
        if (!sessionStorage.getItem('accessToken')) {
            location.path('/');
        }
    };

    var getHeaders = function() {
        return {
            'Authorization': 'Bearer ' + sessionStorage['accessToken']
        };
    };

    FuckBook.showErrorMessage = showErrorMessage;
    FuckBook.showSuccessMessage = showSuccessMessage;
    FuckBook.authorizationCheck = authorizationCheck;
    FuckBook.getHeaders = getHeaders;
})();