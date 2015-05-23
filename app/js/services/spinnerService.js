FuckBook.service('spinner', function (usSpinnerService) {

    this.start = function() {
        usSpinnerService.spin('spinner');
    };

    this.stop = function() {
        usSpinnerService.stop('spinner');
    };

});