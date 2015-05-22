FuckBook.factory('postServices', function ($http, $q) {
    var serviceUrl = "http://softuni-social-network.azurewebsites.net/api/";
    var service = {};

    service.AddPost = function (postData) {
        var deferred = $q.defer();
        $http.post(serviceUrl, postData)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.NewsFeedPosts = function (startPostId) {
        var deferred = $q.defer();
        var request = serviceUrl + "me/feed?StartPostId=" + (startPostId || "") + "&PageSize=5";
        // console.log(request);
        $http.get(request)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.AddCommentToPost = function(postId,data){
        var deferred = $q.defer();
        $http.post(serviceUrl+"posts/"+postId+"/comments",data)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.GetCommentByPostId = function(postId){
        var deferred = $q.defer();
        $http.get(serviceUrl+"posts/"+postId+"/comments")
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.EditPostById = function(postId,data){
        var deferred = $q.defer();
        $http.put(serviceUrl+"Posts/"+postId,data)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.SearchByName = function (search) {
        var deferred = $q.defer();
        $http.defaults.headers.common = GetHeaders();
        $http.get("http://softuni-social-network.azurewebsites.net/api/users/search?searchTerm=" + search)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.LikePost = function(postId){
        var deferred = $q.defer();
        //api/Posts/1/likes
        $http.post(serviceUrl+"Posts/"+postId+ "/likes")
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    service.UnLikePost = function(postId){
        var deferred = $q.defer();
        $http.delete(serviceUrl+"Posts/"+postId+ "/likes")
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    service.likeComment = function(postId , commentId){
        var deferred = $q.defer();
        //api/Posts/1/likes
        console.log(postId);
        console.log(commentId);
        //http://softuni-social-network.azurewebsites.net/api/posts/26/comments/9/likes
        $http.post(serviceUrl+"posts/"+postId+ "/comments/"+ commentId + "/likes")
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    service.unLikeComment = function(postId , commentId){
        var deferred = $q.defer();
        //api/Posts/1/likes
        //http://softuni-social-network.azurewebsites.net/api/posts/26/comments/9/likes
        $http.delete(serviceUrl+"posts/"+postId+ "/comments/"+ commentId + "/likes")
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    function GetHeaders() {
        return {
            'Authorization': 'Bearer ' + sessionStorage['accessToken']
        };
    }

    return service;
});