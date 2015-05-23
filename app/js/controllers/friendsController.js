FuckBook.controller("FriendsController", function ($scope, $location, $routeParams, friendsService, spinner) {

    $scope.loadFriends = function() {
        spinner.start();
        friendsService.getFriends()
            .then(function (data) {
                $scope.myFriends = data;
            }, function(error) {
                console.log(error);
            }).finally(function () {
                spinner.stop();
            });
    };

    $scope.search = function(){
        spinner.start();
        friendsService.searchByName($scope.search.searchTerm)
            .then(function(data){
                console.log(data);
                $scope.findedUsers = data;
            }, function(error){
                console.log(error);
            }).finally(function () {
                spinner.stop();
            });
    };

    $scope.getUserWall = function(){
        spinner.start();
        friendsService.getUserWall(sessionStorage['searchedUser'])
            .then(function(data){
                $scope.searchedUser = data;
            }, function (error) {
                console.log(error);
            }).finally(function () {
                spinner.stop();
            });
    };

    $scope.showMyFriends = function () {
        spinner.start();
        friendsService.getMyFriends()
            .then(function (data) {
                $scope.myFriends = data;
            }, function(error){
                console.log(error);
            }).finally(function () {
                spinner.stop();
            })
    };

    $scope.redirectToUsersPage = function(username){
        $scope.searchedUser  = username;
        sessionStorage['searchedUser'] = username;
        console.log($scope);
        $location.path('/users/' + username);
    };

    $scope.showFriendsOfFriend = function() {
        spinner.start();
        friendsService.getFriendsOfFriend($routeParams.name)
            .then(function(data) {
                $scope.hisFriends = data;
            }, function(error) {
                console.log(error);
            }).finally(function () {
                spinner.stop();
            })
    };

});