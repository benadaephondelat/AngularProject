FuckBook.factory('postServices', function ($http, $q) {
    var serviceUrl = "http://softuni-social-network.azurewebsites.net/api/";
    var service = {};

    service.addPost = function (postData) {
        var deferred = $q.defer();
        $http.post(serviceUrl + 'posts', postData)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.newsFeedPosts = function(startPostId) {
        var deferred = $q.defer();
        var request = serviceUrl + "me/feed?StartPostId=" + (startPostId || "") + "&PageSize=5";
        $http.get(request)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.userPosts = function(startPostId, username) {
        var deferred = $q.defer();
        var request = serviceUrl + "users/" + username +"/wall?StartPostId=" + (startPostId || "") + "&PageSize=5";
        $http.get(request)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.addCommentToPost = function(postId, data){
        var deferred = $q.defer();
        $http.post(serviceUrl + "posts/" + postId + "/comments", data)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.getCommentByPostId = function(postId){
        var deferred = $q.defer();
        $http.get(serviceUrl + "posts/" + postId + "/comments")
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.editPostById = function(postId, data){
        var deferred = $q.defer();
        $http.put(serviceUrl + "Posts/" + postId, data)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.searchByName = function (search) {
        var deferred = $q.defer();
        $http.defaults.headers.common = FuckBook.getHeaders();
        $http.get("http://softuni-social-network.azurewebsites.net/api/users/search?searchTerm=" + search)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.likePost = function(postId){
        var deferred = $q.defer();
        $http.post(serviceUrl + "Posts/" + postId + "/likes")
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.unlikePost = function(postId){
        var deferred = $q.defer();
        $http.delete(serviceUrl + "Posts/" + postId + "/likes")
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.likeComment = function(postId , commentId){
        var deferred = $q.defer();
        $http.post(serviceUrl + "posts/" + postId + "/comments/" + commentId + "/likes")
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.unLikeComment = function(postId , commentId){
        var deferred = $q.defer();
        $http.delete(serviceUrl+"posts/"+postId+ "/comments/"+ commentId + "/likes")
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    return service;
});