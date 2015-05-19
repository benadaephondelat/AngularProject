var FuckBook = angular.module('FuckBook', ['ngRoute']);

FuckBook.config(function ($routeProvider) {
    $routeProvider
        .when('/register', {
            templateUrl:'templates/register.html',
            controller:'LoginRegisterController'
        })
        .when('/login', {
            templateUrl:'templates/login.html',
            controller:'LoginRegisterController'
        })
        .otherwise({redirectTo: '/login'})
});