FuckBook.controller('HomePageController', function ($scope, loginRegisterServices, friendsService, notificationsService, spinner) {
    $scope.username = sessionStorage['username'];

    $scope.getReceivedRequests = function(){
        spinner.start();
        friendsService.getReceivedRequests()
            .then(function (data) {
                $scope.watingRequests = data;
            }, function(error){
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            })
    };

    $scope.acceptFriendRequest  = function (userId) {
        spinner.start();
        friendsService.acceptFriendRequest(userId)
            .then(function (data) {
                FuckBook.showSuccessMessage('Friend request accepted!', notificationsService);
            }, function(error){
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            });
    };

    $scope.rejectFriendRequest  = function (userId) {
        spinner.start();
        friendsService.rejectFriendRequest(userId)
            .then(function (data) {
                FuckBook.showSuccessMessage('Friend request rejected!', notificationsService);
            }, function(error){
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            });
    };

    $scope.sendFriendRequest = function (username) {
        spinner.start();
        friendsService.sendFriendRequest(username)
            .then(function (data) {
                $scope.searchedUser.hasPendingRequest = true;
                FuckBook.showSuccessMessage('Friend request sent!', notificationsService);
            }, function (error) {
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            });
    };

});