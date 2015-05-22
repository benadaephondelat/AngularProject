var FuckBook = angular.module('FuckBook', ['ngRoute', 'customFilters', 'infinite-scroll', 'angularSpinner']);

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
        .when('/users/:name', {
            controller: 'FriendsController',
            templateUrl: function(){
                return 'templates/userWall.html';
        }})
        .when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'HomePageController'
        })
        .when('/', {
            templateUrl: 'templates/welcome.html'
        })
        .when('/users/:name/friends', {
            controller: 'FriendsController',
            templateUrl: function () {
                return 'templates/userFriends.html';
            }
        })
        .otherwise({redirectTo: '/'})
}).run(function($location) {
    FuckBook.authorizationCheck($location);
});