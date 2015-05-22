var app = angular.module('plunker', []);


FuckBook.controller('MainCtrl', function($scope) {
    $scope.name = 'World';
});

FuckBook.directive('mypopover', function ($compile,$templateCache) {

    var getTemplate = function (contentType) {
        var template = '';
        switch (contentType) {
            case 'user':
                template = $templateCache.get("templateId.html");
                break;
        }
        return template;
    }
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            var popOverContent;

            popOverContent = getTemplate("user");
            var options = {
                content: popOverContent,
                placement: "right",
                html: true,
                date: scope.date
            };
            $(element).popover(options);
        }
    };
});