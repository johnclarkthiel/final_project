var app = angular.module('user-auth', ['ngRoute']);
//using http for ajax requests to the server, $scope to access elements on the page, $rootScope to make objects globally accessible and location to change partials to render new page views, using route params to get params in url
app.controller('AuthController', ['$http', '$scope', '$location', '$rootScope', '$routeParams', function($http, $scope, $location, $rootScope, $routeParams) {
	// $rootScope.user = null;

	$http.get('/checkuser').then(function(response){
		// console.log("CHECK USER RESPONSE", response);
		$http.get('/user/' + response.data).then(function(response){
				// console.log("SECOND GET RESPONSE", response);
				$rootScope.user = response.data;
			});
	});


	var controller = this;
	this.password = null;
	this.id = $routeParams.id
	//don't need to reference controller in index.html when using scope
	//sign up ... accesses email and pw, sends to server login post route, gets response and changes rootScope user to the response data
	$scope.authUser = function() {
		// console.log('AUTH USER WORKED!');
		var userName = $scope.name;
		var uEmail = $scope.email;
		var uPassword = $scope.password;
		// console.log("USERNAME EMAIL PASSWORD" + userName + " " + uEmail + " " + uPassword);
		//sends username, email and pw to server post signup route
		$http.post('/user/signup', {name: userName, email: uEmail, password: uPassword}).then(function(response) {
			// console.log("HERE IS THE RESPONSE", response);
			//get request to the get user server route, sets the response to rootScope.user to display the user's info
			$http.get('/user/' + response.data._id).then(function(response){
				// console.log("GET RESPONSE", response);
				$rootScope.user = response.data;
			});
		},
		function(err){
			console.log(err);
		});
	};
//log in ... accesses email and pw, sends to server login post route, gets response and changes rootScope user to the response data
	$scope.login = function() {
		// console.log('log in working');
		var uEmail = $scope.email;
		var uPassword = $scope.password;
		// console.log("EMAIL PASSWORD " + uEmail + " " + uPassword);
		//sends username, email and pw to server post login route
		$http.post('/user/login', {email : uEmail, password: uPassword}).then(function(response){
			// console.log("LOGIN RES ", response);
			//get request to the get user server route, sets the response to rootScope.user to display the user's info
			$http.get('/user/' + response.data._id).then(function(response){
				// console.log("GET LOGIN RES ", response);
				$rootScope.user = response.data;
				$location.path('/');
			});
		},
		function(err){
			console.log("ERROR ", err);
		});
	};
//log out ... accesses the global user object using rootScope
	$rootScope.logOut = function() {
		// console.log('log out working');
		// console.log($rootScope.user);
		$http.get('/user/' + $rootScope.user._id + '/logout').then(function(response){
			// console.log('LOGOUT RES ', response);
			$rootScope.user = null;
			// console.log('USER ',$rootScope.user);
		},
		function(err){
			console.log("ERROR ", err);
		});
	};

}]); //END USER CONTROLLER

//front end router to take signed up users to login page
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({ enabled: true }); // tell angular to use push state
	$routeProvider.
	when('/', {
		templateUrl: 'partials/mainpage.html',
		controller: 'AuthController',
		controllerAs: 'authCtrl'
	}).
	when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'AuthController',
		controllerAs: 'authCtrl'
	}).otherwise({
		redirectTo: '/'
	});
}]);
