FuckBook.controller('postController', function ($scope, postServices, notificationsService) {
    $scope.username = sessionStorage['username'];
    $scope.startPostId = "";
    $scope.newsPosts = [];
    $scope.isBusy = false;
    $scope.comments = [];

    $scope.addPost = function () {
        postServices.AddPost()
            .then(function (data) {
                FuckBook.showSuccessMessage('Post successfully added!', notificationsService);
                console.log(data);
            }, function (error) {
                FuckBook.showErrorMessage(error, notificationsService);
                console.log(error);
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
            }, function (error) {
                console.log(error);
            })
    };

    $scope.addCommentToPost = function (post) {
        if($scope.commentData) {
            var data = {
                commentContent: $scope.commentData.content
            };
            postServices.AddCommentToPost(post.id, data)
                .then(function (data) {
                    post.comments.splice(0, 0 ,data);
                    ++post.totalCommentsCount;
                    console.log(data);
                    FuckBook.showSuccessMessage('Comment successfully added!', notificationsService);
                }, function (error) {
                    console.log(error);
                    FuckBook.showErrorMessage(error, notificationsService);
                })
        } else {
            FuckBook.showSuccessMessage('Please enter something!', notificationsService);
        }
    };

    $scope.getCommentByPostId = function (id) {
        postServices.GetCommentByPostId(id)
            .then(function (data) {
                console.log(data);
                $scope.comments[id] = data;
            }, function (error) {
                console.log(error);
            })
    };

    $scope.editPostById = function(id){
        postServices.EditPostById(id,$scope.contentToChange)
            .then(function (data) {

            }, function (error) {
                console.log(error);
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
                FuckBook.showSuccessMessage('Post successfully liked!', notificationsService);
            }, function (error) {
                console.log(error);
                FuckBook.showErrorMessage(error, notificationsService);
            })
    };
    $scope.unLikePost = function (post) {
        postServices.UnLikePost(post.id)
            .then(function (data) {
                post.liked = false;
                post.likesCount--;
                console.log('disLiked');
                FuckBook.showSuccessMessage('Post successfully unliked!', notificationsService);
            }, function (error) {
                console.log(error);
                FuckBook.showErrorMessage(error, notificationsService);
            })
    };

    $scope.likeComment= function(post, comment){
        console.log(comment);
        postServices.likeComment(post.id, comment.id)
            .then(function (data) {
                comment.liked = true;
                comment.likesCount++;
                FuckBook.showSuccessMessage('Comment successfully liked!', notificationsService);
            }, function (error) {
                console.log(error);
                FuckBook.showErrorMessage(error, notificationsService);
            })
    };

    $scope.unLikeComment= function(post, comment){
        console.log(comment);
        postServices.unLikeComment(post.id, comment.id)
            .then(function (data) {
                comment.liked = false;
                comment.likesCount--;
                FuckBook.showSuccessMessage('Comment successfully unliked!', notificationsService);
            }, function (error) {
                console.log(error);
                FuckBook.showErrorMessage(error, notificationsService);
            })
    };

});