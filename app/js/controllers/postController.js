FuckBook.controller('postController', function ($scope, postServices) {
    $scope.username = sessionStorage['username'];
    $scope.startPostId = "";
    $scope.newsPosts = [];
    $scope.isBusy = false;

    $scope.addPost = function () {
        postServices.AddPost()
            .then(function (data) {
                console.log(data);
            }, function (err) {
                console.log(err);
            })
    };

    $scope.nextPage = function () {
        if ($scope.isBusy) {
            return;
        }
        $scope.isBusy = true;
        postServices.NewsFeedPosts($scope.startPostId)
            .then(function (data) {
                $scope.busy = true;
                var posts = data;
                for (var i = 0; i < posts.length; i++) {
                    $scope.newsPosts.push(posts[i]);
                }
                $scope.startPostId = $scope.newsPosts[$scope.newsPosts.length - 1].id;
                $scope.isBusy = false;
            }, function (err) {
                console.log(err);
            })
    };

    $scope.addCommentToPost = function (postId) {
        var data = {
            commentContent: $scope.commentData.content
        };
        console.log($scope.commentData);
        postServices.AddCommentToPost(postId, data)
            .then(function (data) {
                console.log('yea');
                console.log(data);
            }, function (err) {
                console.log(err);
            })
    };

    $scope.getCommentByPostId = function (id) {
        postServices.GetCommentByPostId(id)
            .then(function (data) {
                console.log('yea');
                $scope.comments = data.comments;
            }, function (err) {
                console.log(err);
            })
    };

    $scope.editPostById = function(id){
        postServices.EditPostById(id,$scope.contentToChange)
            .then(function (data) {
                console.log('yea');
            }, function (err) {
                console.log(err);
            })
    };

});