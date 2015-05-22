FuckBook.controller('HomePageController', function ($scope, loginRegisterServices, friendsService, notificationsService) {

    $scope.username = sessionStorage['username'];

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
                notificationsService.success('Friend request accepted!');
            }, function(err){
                console.log(err);
                notificationsService.error(error.error_description);
            });
    };

    $scope.rejectFriendRequest  = function (userId) {
        friendsService.rejectFriendRequest(userId)
            .then(function (data) {
                notificationsService.success('Friend request rejected!');
            }, function(err){
                notificationsService.error(error.error_description);
                console.log(err)
            });
    };

    $scope.sendFriendRequest = function (username) {
        friendsService.sendFriendRequest(username)
            .then(function (data) {
                console.log(data);
                $scope.searchedUser.hasPendingRequest = true;
                notificationsService.success('Friend request sent!');
            }, function (err) {
                notificationsService.error(error.error_description);
                console.log(err);
            })
    };
});