'use strict';

// init
var app = angular.module('express-auth', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
]);

// Routes
app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/main.html',
			controller: 'MainCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
			controller: 'AuthCtrl'
		})
		.state('register', {
			url: '/register',
			templateUrl: 'views/register.html',
			controller: 'AuthCtrl'

		})

	// if no route matches
	$urlRouterProvider.otherwise('/');

	// remove /#/ from routes
    $locationProvider.html5Mode(true);
}]);