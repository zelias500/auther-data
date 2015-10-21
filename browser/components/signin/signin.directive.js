app.directive("signIn", function(){
	return {
		restrict:"E",
		scope: {
			method: "=",
			name: "@"
		},
		templateUrl: "/browser/components/signin/signin.template.html"
	}
})

