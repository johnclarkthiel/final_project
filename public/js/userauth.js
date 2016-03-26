var app = angular.module("user-auth", ["ngRoute"]);
//using http for ajax requests to the server, $scope to access elements on the page, $rootScope to make objects globally accessible and location to change partials to render new page views, using route params to get params in url
app.controller('AuthController', ['$http', '$scope', '$location', '$rootScope', '$routeParams', function($http, $scope, $location, $rootScope, $routeParams) {
	$rootScope.user = null;
	var controller = this;
	this.password = null;
	this.id = $routeParams.id
	//don't need to reference controller in index.html when using scope
	$scope.authUser = function() {
		console.log('AUTH USER WORKED!');
	};

	$scope.login = function() {
		console.log('log in working');
	};


}]); //END USER CONTROLLER

//front end router to take signed up users to login page
app.config(['$routeProvider', 'locationProvider', function($routeProvider,$locationProvider){
	$locationProvider.html5Mode({ enabled : true });
	$routeProvider
	.when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'AuthController',
		controllerAs: 'authCtrl'
	}).otherwise({
		redirectTo: '/'
	});
}]);