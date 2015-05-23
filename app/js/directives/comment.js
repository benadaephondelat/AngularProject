FuckBook.directive('comment', function(){
    return{
        restrict : 'E',
        templateUrl : 'templates/comments.html',
        controller: 'postController'
    }
});