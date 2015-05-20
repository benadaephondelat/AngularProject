FuckBook.directive('userwall', function(){
    return{
        restrict : 'E',
        templateUrl : 'templates/wallTemplate.html',
        controller: 'FriendsController',
        controllerAs : 'FriendsController'
    }
});