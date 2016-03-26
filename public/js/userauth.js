var app = angular.module("user-auth", ["ngRoute"]);
//using http for ajax requests to the server, $scope to access elements on the page, $rootScope to make objects globally accessible and location to change partials to render new page views
app.controller('AuthController', ['$http', '$scope', '$location', '$rootScope', function($http, $scope, $location, $rootScope) {




}]); //END USER CONTROLLER

//front end router to take signed up users to login page
app.config(['$routeProvider', 'locationProvider', function($routeProvider,$locationProvider){
	$locationProvider.html5Mode({ enabled : true });
	$routeProvider
	.when('/login', {
		templateUrl: 'partials/loginform.html',
		controller: 'AuthController',
		controllerAs: 'authCtrl'
	}).otherwise({
		redirectTo: '/'
	});
}]);