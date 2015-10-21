'use strict';

app.directive('navbar', function ($state, $location, $http) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/navbar/navbar.html',
		link: function (scope) {
			scope.pathStartsWithStatePath = function (state) {
				var partial = $state.href(state);
				var path = $location.path();
				return path.startsWith(partial);
			}
			scope.logout = function () {
				return $http.get('api/users/logout')
					.then(function (res) {
						$state.go('home');
					});
			}
		}
	}
});