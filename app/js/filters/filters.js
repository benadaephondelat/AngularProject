angular.module('customFilters', []).filter('genderFilter', function() {
    return function(input) {
        switch (input) {
            case 1:
                return 'Male';

            case 2:
                return 'Female';

            case 0:
                return 'Other';
        }
    };
});