app.controller("signup", function($scope, Auth, $state){
	// $scope.logOurCredentials = function(){
	// 	console.log($scope.credentials)
	// }

	$scope.signup = function(credentials){
		Auth.signup(credentials).then(function(user){
			$state.go('user', {id: user._id});
		})
	}


})