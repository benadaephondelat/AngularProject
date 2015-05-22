FuckBook.factory('notificationsService', function () {
        return {
            success: function(message) {
                noty({
                        text: message,
                        type: 'success',
                        layout: 'center',
                        timeout: 2000}
                );
            },
            error: function(message) {
                noty({
                        text: message,
                        type: 'error',
                        layout: 'center',
                        timeout: 3000}
                );
            }
        }
    }
);