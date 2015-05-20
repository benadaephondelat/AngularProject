angular.module('customFilters', []).filter('genderFilter', function() {
    return function(input) {
        switch (input) {
            case 0:
                return 'Male';

            case 1:
                return 'Female';

            case 2:
                return 'Other';
        }
    };
});