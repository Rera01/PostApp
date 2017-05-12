angular.module("PostsApp", [ "ui.bootstrap", "ngRoute", "ngResource"])
	.config(function($routeProvider){
		$routeProvider
			/*Home page information*/
			.when("/", {
				controller: "Main",
				templateUrl: "templates/home.html"
			})
			.when("/new", {
				controller: "NewPost",
				templateUrl: "templates/new_post.html"
			})
			.when("/post/:id", {
				controller: "Post",
				templateUrl: "templates/post.html"
			})
			.when("/post/edit/:id", {
				controller: "Post",
				templateUrl: "templates/new_post.html"
			})
	});