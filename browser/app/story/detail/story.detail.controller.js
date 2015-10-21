'use strict';

app.controller('StoryDetailCtrl', function ($scope, story, users, Auth) {
	// $scope.currentUser = Auth.getCurrentUser();
	// if ($scope.currentUser) {
	// 	$scope.canEdit = $scope.currentUser.isAdmin || $scope.currentUser.name === $scope.story.author.name
	// }
	$scope.canEdit = Auth.canEdit


	$scope.story = story;
	$scope.users = users;
	$scope.$watch('story', function () {
		$scope.story.save();
	}, true);
});