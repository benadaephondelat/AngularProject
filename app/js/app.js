var FuckBook = angular.module('FuckBook', ['ngRoute']);

FuckBook.config(function ($routeProvider) {
    $routeProvider
        .when('/register', {
            templateUrl: 'templates/register.html',
            controller: 'LoginRegisterController'
        })
        .when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'LoginRegisterController'
        })
        .when('/changePassword', {
            templateUrl: 'templates/changePassword.html',
            controller: 'EditProfileController'
        })
        .when('/editProfile', {
            templateUrl: 'templates/editProfile.html',
            controller: 'EditProfileController'
        })
        .when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'HomePageController'
        })
        .otherwise({redirectTo: '/home'})
});
