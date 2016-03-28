var app = angular.module('add-day', ['ngRoute']);

app.controller('DayController', ['$http', '$scope', '$location', '$rootScope', '$routeParams', function($http,$scope,$location,$rootScope, $routeParams){
	this.showBored = true;
	this.showBoredForm = false;	

	this.boredForm = function() {
		this.showBored = !this.showBored;
		this.showBoredForm = !this.showBoredForm;
	};

	this.addDay = function() {
		// console.log('ADD DAY BUTTON WORKING');
		// console.log($rootScope.user);
		// console.log($scope);
		// var day = this.day;
		// console.log("DAY ", day);
		var controller = this;
		$http.post('/user/' + $rootScope.user._id, {day: this.day, description: this.description, severity: this.severity}).then(function(response){
			// console.log(response);
			this.day = undefined;
			this.description = undefined;
			this.severity = undefined;
			$location.path('/search');
		},
		function(err){
			console.log(err);
		})
	};

	this.days = $rootScope.user.day;
	this.searches = [];
	for (var i = 0; i < $rootScope.user.day.length; i++ ) {
		console.log($rootScope.user.day[i].search);
		//NEED ANOTHER FOR LOOP? 
		this.searches.push($rootScope.user.day[i].search);
	}

	this.showUser = function() {
		console.log($rootScope.user);
	}

	console.log("SEARCHES ", this.searches);
	console.log("SEARCHES TYPEOF ", typeof this.searches);

}]);//end Day controller

//front end router to take logged in users to serach page once a day is added
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({ enabled: true }); // tell angular to use push state
	$routeProvider.
	when('/', {
		templateUrl: 'partials/mainpage.html',
		controller: 'AuthController',
		controllerAs: 'authCtrl'
	}).
	when('/search', {
		templateUrl: 'partials/search.html',
		controller: 'SearchController',
		controllerAs: 'searchCtrl'
	}).
	when('/days', {
		templateUrl: 'partials/day.html',
		controller: 'DayController',
		controllerAs: 'dayCtrl'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);