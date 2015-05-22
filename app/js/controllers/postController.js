FuckBook.controller('postController', function ($scope, postServices, notificationsService) {
    $scope.username = sessionStorage['username'];
    $scope.startPostId = "";
    $scope.newsPosts = [];
    $scope.isBusy = false;

    $scope.addPost = function () {
        postServices.AddPost()
            .then(function (data) {
                notificationsService.success('Post successfully added!');
                console.log(data);
            }, function (err) {
                notificationsService.error(error.error_description);
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
                console.log(data);
                $scope.busy = true;
                var posts = data;
                for (var i = 0; i < posts.length; i++) {
                    $scope.newsPosts.push(posts[i]);
                }
                if($scope.newsPosts.length != 0) {
                    $scope.startPostId = $scope.newsPosts[$scope.newsPosts.length - 1].id;
                }
                $scope.isBusy = false;
            }, function (err) {
                console.log(err);
            })
    };

    $scope.addCommentToPost = function (post) {
        var data = {
            commentContent: $scope.commentData.content
        };
        console.log($scope.commentData);
        postServices.AddCommentToPost(post.id, data)
            .then(function (data) {
                post.comments.push(data);
                ++post.totalCommentsCount;
                console.log(data);
                notificationsService.success('Comment successfully added!');
            }, function (err) {
                console.log(err);
                notificationsService.error(error.error_description);
            })
    };

    $scope.getCommentByPostId = function (id) {
        postServices.GetCommentByPostId(id)
            .then(function (data) {
                console.log(data);
                $scope.comments = data.comments;
            }, function (err) {
                console.log(err);
            })
    };

    $scope.editPostById = function(id){
        postServices.EditPostById(id,$scope.contentToChange)
            .then(function (data) {

            }, function (err) {
                console.log(err);
            })
    };

    $scope.showUser = function(name) {
        postServices.SearchByName(name)
            .then(function (data) {

               console.log(data);
            }, function (error) {
                console.log(error);
            })
    };

    $scope.likePost = function (post) {
        postServices.LikePost(post.id)
            .then(function (data) {
                post.liked = true;
                post.likesCount++;
                notificationsService.success('Post successfully liked!');
            }, function (err) {
                console.log(err);
                notificationsService.error(error.error_description);
            })
    };
    $scope.unLikePost = function (post) {
        postServices.UnLikePost(post.id)
            .then(function (data) {
                post.liked = false;
                post.likesCount--;
                console.log('disLiked');
                notificationsService.success('Post successfully unliked!');
            }, function (err) {
                console.log(err);
                notificationsService.error(error.error_description);
            })
    };

    $scope.likeComment= function(post, comment){
        console.log(comment);
        postServices.likeComment(post.id, comment.id)
            .then(function (data) {
                comment.liked = true;
                comment.likesCount++;
                notificationsService.success('Comment successfully liked!');
            }, function (err) {
                console.log(err);
                notificationsService.error(error.error_description);
            })
    };

    $scope.unLikeComment= function(post, comment){
        console.log(comment);
        postServices.unLikeComment(post.id, comment.id)
            .then(function (data) {
                comment.liked = false;
                comment.likesCount--;
                notificationsService.success('Comment successfully unliked!');
            }, function (err) {
                console.log(err);
                notificationsService.error(error.error_description);
            })
    };


});