FuckBook.directive('defaultPicture', function () {
    return {
        link: function ($scope, element, attrs) {
            if (attrs['ng-src'] === undefined) {
                $(element).attr("src", "resources/defaultPicture.jpg");
            }
        }
    }
});