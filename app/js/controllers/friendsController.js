FuckBook.controller("FriendsController", function ($scope, friendsService, $location) {

    $scope.loadFriends = function() {
        friendsService.getFriends()
            .then(function (data) {
                $scope.myFriends = data;
            }, function(error) {
                console.log(error);
            })
    };

});