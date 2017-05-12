angular.module("PostsApp")
	.controller("Main", function($scope, $resource, SharePosts){
		/*All posts info and pagination*/
		$scope.currentPage = 1;
    	$scope.numPerPage = 10;
		$scope.maxSize = 5;
		$scope.pag = SharePosts.getValue();
		$scope.deletePost = function(post){
			for(x in $scope.pag){
				if($scope.pag[x].id == post.id){
					$scope.pag.splice(x, 1);
				}
			}
			$scope.pag = $scope.pag.filter(function(element){
				return element.id !== post.id;
			});
		};

	})
	.controller("NewPost", function($scope, PostResource, $location, SharePosts){
		/*Create new post*/
		$scope.post = {};
		$scope.title = "New Post";
		$scope.pag = SharePosts.getValue();
		$scope.savePost = function(){
			PostResource.save({title: $scope.post.title, body: $scope.post.body}, function(data){
				console.log(data);
				$scope.pag.push(data);
				SharePosts.setValue($scope.pag);
				$location.path("/");
			});
		};
	})
	.controller("Post", function($scope, $location, SharePosts, $routeParams, PostResource){
		/*Post Info and Edit*/
		$scope.title = "Edit Post";
		$scope.post = {};
		$scope.p = SharePosts.getValue();
		$scope.info = function(){
			for(x in $scope.p){
				if($scope.p[x].id == $routeParams.id){
					$scope.post.title = $scope.p[x].title;
					$scope.post.body = $scope.p[x].body;
					$scope.post.id = $scope.p[x].id;
				}
			}
		};
		$scope.info();
		$scope.savePost = function(){
			PostResource.save({title: $scope.post.title, body: $scope.post.body}, function(data){
				for(x in $scope.p){
					if($scope.p[x].id == $routeParams.id){
						$scope.p[x].title = $scope.post.title;
						$scope.p[x].body = $scope.post.body;
						$scope.p[x].id = $scope.post.id;
					}
				}
				SharePosts.setValue($scope.p);
				$location.path("/");
			});
		};
		$scope.deletePost = function(post){
			$scope.p.splice(post - 1, 1);
			SharePosts.setValue($scope.p);
			$location.path("/");
		};
	})