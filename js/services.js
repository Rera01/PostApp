/* Custom factory with source of all the posts and update method*/

angular.module("PostsApp")
	.factory("PostResource", function($resource){
		return $resource("https://jsonplaceholder.typicode.com/posts/:id", {id: "@id"}, {update: {method: "PUT"}});
	})
	.factory("SharePosts", function(PostResource){
		/*This factory calls all the posts and shares them to all the controllers*/
		var posts = PostResource.query();

        return {
            getValue: function () {
                return posts;
            },
            setValue: function(value) {
                posts = value;
            },
        };
	})