FuckBook.controller('postController', function ($scope, $routeParams, $http,  postServices, notificationsService, spinner) {
    $scope.username = sessionStorage['username'];
    $scope.startPostId = "";
    $scope.newsPosts = [];
    $scope.usernewsPosts = [];
    $scope.isBusy = false;
    $scope.comments = [];
    $http.defaults.headers.common = FuckBook.getHeaders();

    $scope.addPost = function () {
        spinner.start();
        var data = {
            postContent: $scope.postFriendData,
            username: $routeParams.name
        };

        postServices.addPost(data)
            .then(function (data) {
                $scope.usernewsPosts.splice(0, 0, data);
                FuckBook.showSuccessMessage('Post successfully added!', notificationsService);
            }, function (error) {
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            })
    };

    $scope.nextPage = function () {
        spinner.start();
        if ($scope.isBusy) {
            return;
        }
        $scope.isBusy = true;
        postServices.newsFeedPosts($scope.startPostId)
            .then(function (data) {
                $scope.busy = true;
                var posts = data;
                for (var i = 0; i < posts.length; i++) {
                    $scope.newsPosts.push(posts[i]);
                }
                if ($scope.newsPosts.length != 0) {
                    $scope.startPostId = $scope.newsPosts[$scope.newsPosts.length - 1].id;
                }
                $scope.isBusy = false;
            }, function (error) {
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            });
    };

    $scope.nextPageUser = function () {
        spinner.start();
        if ($scope.isBusy) {
            return;
        }
        $scope.isBusy = true;
        postServices.userPosts($scope.startPostId, sessionStorage['searchedUser'])
            .then(function (data) {
                $scope.busy = true;
                var posts = data;
                for (var i = 0; i < posts.length; i++) {
                    $scope.usernewsPosts.push(posts[i]);
                }
                if ($scope.usernewsPosts.length != 0) {
                    $scope.startPostId = $scope.usernewsPosts[$scope.usernewsPosts.length - 1].id;
                }
                $scope.isBusy = false;
            }, function (error) {
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            });
    };

    $scope.addCommentToPost = function (post) {
        spinner.start();
        if ($scope.commentData) {
            var data = {
                commentContent: $scope.commentData.content
            };
            postServices.addCommentToPost(post.id, data)
                .then(function (data) {
                    post.comments.splice(0, 0, data);
                    ++post.totalCommentsCount;
                    FuckBook.showSuccessMessage('Comment successfully added!', notificationsService);
                }, function (error) {
                    FuckBook.showErrorMessage(error, notificationsService);
                }).finally(function () {
                    spinner.stop();
                });
        } else {
            FuckBook.showSuccessMessage('Please enter something!', notificationsService);
        }
    };

    $scope.getCommentByPostId = function (id) {
        spinner.start();
        postServices.getCommentByPostId(id)
            .then(function (data) {
                $scope.comments[id] = data;
            }, function (error) {
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            })
    };

    $scope.editPostById = function (id) {
        spinner.start();
        postServices.editPostById(id, $scope.contentToChange)
            .then(function (data) {
            }, function (error) {
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            });
    };

    $scope.showUser = function (name) {
        spinner.start();
        postServices.searchByName(name)
            .then(function (data) {

            }, function (error) {
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            });
    };


    $scope.likePost = function (post) {
        spinner.start();
        postServices.likePost(post.id)
            .then(function (data) {
                post.liked = true;
                post.likesCount++;
                FuckBook.showSuccessMessage('Post successfully liked!', notificationsService);
            }, function (error) {
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            })
    };

    $scope.unLikePost = function (post) {
        spinner.start();
        postServices.unlikePost(post.id)
            .then(function (data) {
                post.liked = false;
                post.likesCount--;
                FuckBook.showSuccessMessage('Post successfully unliked!', notificationsService);
            }, function (error) {
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            })
    };

    $scope.likeComment = function (post, comment) {
        spinner.start();
        postServices.likeComment(post.id, comment.id)
            .then(function (data) {
                comment.liked = true;
                comment.likesCount++;
                FuckBook.showSuccessMessage('Comment successfully liked!', notificationsService);
            }, function (error) {
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            })
    };

    $scope.unLikeComment = function (post, comment) {
        spinner.start();
        postServices.unLikeComment(post.id, comment.id)
            .then(function (data) {
                comment.liked = false;
                comment.likesCount--;
                FuckBook.showSuccessMessage('Comment successfully unliked!', notificationsService);
            }, function (error) {
                FuckBook.showErrorMessage(error, notificationsService);
            }).finally(function () {
                spinner.stop();
            })
    };

});