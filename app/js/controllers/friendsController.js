FuckBook.controller("FriendsController", function ($scope, friendsService, $location, $routeParams) {

    $scope.loadFriends = function() {
        friendsService.getFriends()
            .then(function (data) {
                $scope.myFriends = data;
            }, function(error) {
                console.log(error);
            })
    };

    $scope.search = function(){
        friendsService.SearchByName($scope.search.searchTerm)
            .then(function(data){
                console.log(data);
                $scope.findedUsers = data;
            }, function(error){
                console.log(error);
            })
    };

    $scope.getUserWall = function(){
        friendsService.getUserWall(sessionStorage['searchedUser'])
            .then(function(data){
                $scope.searchedUser = data;
            }, function (error) {
                console.log(error);
            })
    };

    $scope.showMyFriends = function () {
        friendsService.getMyFriends()
            .then(function (data) {
                $scope.myFriends = data;
            }, function(error){
                console.log(error);
            })
    };

    $scope.redirectToUsersPage = function(username){
        $scope.searchedUser  = username;
        sessionStorage['searchedUser'] = username;
        console.log($scope);
        $location.path('/users/' + username);
    };

    $scope.showFriendsOfFriend = function() {
        friendsService.getFriendsOfFriend($routeParams.name)
            .then(function(data) {
                $scope.hisFriends = data;
            }, function(error) {
                console.log(error);
            })
    }

});