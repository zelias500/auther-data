app.factory("Auth", function($http){
	var currentUser;

	return {
		signup: function(credentials) {
			return $http.post("/api/users", credentials).then(function(response){
				currentUser = response.data
				return currentUser;
			})
		},

		setCurrentUser: function(user){
			currentUser = user;
		},

		login: function(credentials) {
			return $http.put("/api/users/login", credentials).then(function(response){
				currentUser = response.data
				return currentUser;
			})
		},

		getCurrentUser: function(){
			return currentUser;
		},

		canEdit: function(property, comparator) {
			console.log("currentUser", currentUser)
			console.log("comparator", comparator)
			if (comparator[property]) {
				return currentUser && (currentUser.isAdmin || (currentUser[property] === comparator[property]));
			} else { 
				return currentUser && (currentUser.isAdmin || (currentUser[property] === comparator));
			}
		}
	}
})