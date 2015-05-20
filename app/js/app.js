var FuckBook = angular.module('FuckBook', ['ngRoute', 'customFilters', 'infinite-scroll']);

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
        .when('/friends', {
            templateUrl: 'templates/friends.html',
            controller: 'FriendsController'
        })
        .when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'HomePageController'
        })
        .when('/users/:name*', {
            controller: 'FriendsController',
            templateUrl: function(){
                return 'templates/userWall.html';
        }})
        .otherwise({redirectTo: '/'})
});