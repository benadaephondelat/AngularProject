FuckBook.controller('HomePageController', function ($scope, loginRegisterServices, friendsService, notificationsService) {

    $scope.username = sessionStorage['username'];

    $scope.getReceivedRequests = function(){
        friendsService.getReceivedRequests()
            .then(function (data) {
                $scope.watingRequests = data;
            }, function(error){
                console.log(error);
            })
    };

    $scope.acceptFriendRequest  = function (userId) {
        friendsService.acceptFriendRequest(userId)
            .then(function (data) {
                FuckBook.showSuccessMessage('Friend request accepted!', notificationsService);
            }, function(error){
                console.log(error);
                FuckBook.showErrorMessage(error, notificationsService);
            });
    };

    $scope.rejectFriendRequest  = function (userId) {
        friendsService.rejectFriendRequest(userId)
            .then(function (data) {
                FuckBook.showSuccessMessage('Friend request rejected!', notificationsService);
            }, function(error){
                FuckBook.showErrorMessage(error, notificationsService);
                console.log(error)
            });
    };

    $scope.sendFriendRequest = function (username) {
        friendsService.sendFriendRequest(username)
            .then(function (data) {
                console.log(data);
                $scope.searchedUser.hasPendingRequest = true;
                FuckBook.showSuccessMessage('Friend request sent!', notificationsService);
            }, function (error) {
                FuckBook.showErrorMessage(error, notificationsService);
                console.log(error);
            })
    };
});