app.controller("login", function($scope, Auth, $state){
	// $scope.logOurCredentials = function(){
	// 	console.log($scope.credentials)
	// }

	$scope.login = function(credentials){
		Auth.login(credentials).then(function(user){
			$state.go('user', {id: user._id});
		})
	}

})