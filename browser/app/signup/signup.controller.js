app.controller("signup", function($scope, Auth, $state){
	$scope.currentUser = Auth.getCurrentUser();
	if ($scope.currentUser) $state.go('home');

	$scope.signup = function(credentials){
		Auth.signup(credentials).then(function(user){
			$state.go('user', {id: user._id});
		})
	}


})