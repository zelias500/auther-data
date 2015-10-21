app.controller("login", function($scope, Auth, $state){
	$scope.currentUser = Auth.getCurrentUser();
	if ($scope.currentUser) $state.go('home');

	$scope.login = function(credentials){
		Auth.login(credentials).then(function(user){
			$state.go('user', {id: user._id});
		})
	}

})