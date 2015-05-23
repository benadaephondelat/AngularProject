FuckBook.directive('post', function(){
    return{
        restrict : 'E',
        templateUrl : 'templates/posts.html',
        controller: 'postController'
    }
});