FuckBook.controller('HomePageController', function ($scope, loginRegisterServices, friendsService) {

    $scope.username = sessionStorage['username'];

    $scope.logout = function(){
        loginRegisterServices.Logout()
            .then(function(data){

            }, function(err){
                console.log(err);
            })
    };

    $scope.getReceivedRequests = function(){
        friendsService.getReceivedRequests()
            .then(function (data) {
                $scope.watingRequests = data;
            }, function(err){
                console.log(err);
            })
    };

    $scope.acceptFriendRequest  = function (userId) {
        friendsService.acceptFriendRequest(userId)
            .then(function (data) {

            }, function(err){
                console.log(err)
            });
    };

    $scope.rejectFriendRequest  = function (userId) {
        friendsService.rejectFriendRequest(userId)
            .then(function (data) {

            }, function(err){
                console.log(err)
            });
    };

    $scope.sendFriendRequest = function (username) {
        friendsService.sendFriendRequest(username)
            .then(function (data) {
                console.log(data);
                $scope.searchedUser.hasPendingRequest = true;

            }, function (err) {
                console.log(err);
            })
    };
});