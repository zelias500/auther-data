'use strict';

var app = angular.module('auther', ['ui.router']);

app.run(function($http, Auth){
	$http.get('/api/users/login').then(function(res){
		Auth.setCurrentUser(res.data);
	})
})

app.config(function ($urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.when('/auth/:provider', function () {
		window.location.reload();
	});
	$urlRouterProvider.otherwise('/');
});