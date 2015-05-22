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
            }, function (err) {
                console.log(err);
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


});