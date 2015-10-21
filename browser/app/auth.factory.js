app.factory("Auth", function($http){
	return {
		signup: function(credentials) {
			return $http.post("/api/users", credentials).then(function(response){
				return response.data;
			})
		},


		login: function(credentials) {
			return $http.put("/api/users/login", credentials).then(function(response){
				return response.data;
			})
		}

	}
})