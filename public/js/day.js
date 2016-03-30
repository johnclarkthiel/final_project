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
	//setting this to var controller to be used in callback when defining days from server & db get request
	var controller = this;
	//said server - db - client get request
	this.days = $http.get('user/' + $rootScope.user._id).then(function(response){
		console.log('THIS DAYS RESPONSE', response);
		controller.days = response.data.day;
	});

	this.dayIndex = true;

	this.showSurveyForm = function(day,search) {
		console.log('SURVEY FORM WORKING');
		this.showQuestionnaire = true;
		this.dayIndex = false;
		
		///PUT SEND DATA FUNCTION IN HERE????
		this.sendData = function() {
			console.log(this.query1);
			console.log(this.query2);
			console.log(this.notes);
			console.log(day);
			console.log(search);
			var userID = $rootScope.user._id;
			var dayID = day._id;
			var searchID = search._id;
			$http.put('/user/' + userID + '/' + dayID + '/' + searchID, {search_query_one: this.query1, search_query_two: this.query2, notes: this.notes}).then(function(response){
				console.log(response);
				controller.query1 = null;
				controller.query2 = null;
				controller.notes = null;
				controller.showQuestionnaire = false;
				controller.dayIndex = true;
				$location.path('/metrics');
			},
			function(err){
				console.log(err);
				controller.query1 = null;
				controller.query2 = null;
				controller.notes = null;
				controller.dayIndex = true;
				controller.showQuestionnaire = false;
			});
		};
	};

	this.cancel = function() {
		this.showQuestionnaire = false;
		this.dayIndex = true;
	};

	this.delete = function (day, search, index) {
		console.log('DELETE BUTTON WORKING');
		console.log("DAY ", day);
		console.log("SEARCH ", search);
		console.log("INDEX POS ", index)
		$http.delete('/user/' + $rootScope.user._id + '/' + day._id + '/' + search._id).then(function(response){
			console.log(response);
			console.log($scope);
			// $location.path('/');
			for (var i = 0; i < $scope.dayCtrl.days.length; i++) {
				// console.log(day);
				var specDay = $scope.dayCtrl.days[i];
				if (specDay._id == day._id) {
					$scope.dayCtrl.days[i].search.splice(index,1)
				};
			};
		},
		function(err){
			console.log(err);
		})
	};

	this.deleteDay = function(index, day) {
		console.log("DELETE DAY WORKING");
		console.log(index);
		console.log(day);
		console.log($scope);
		$http.delete('/user/' + $rootScope.user._id + '/' + day._id ).then(function(response){
			$scope.dayCtrl.days.splice(index,1);
		});
	};


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
	when('/metrics', {
	templateUrl: 'partials/metrics.html',
	controller: 'MetricsController',
	controllerAs: 'metCtrl'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);

/////////////////////
////OLD CODE
////////////////////
	// this.searches = [];
	// for (var i = 0; i < $rootScope.user.day.length; i++ ) {
	// 	console.log($rootScope.user.day[i].search);
	// 	var search = $rootScope.user.day[i].search;
	// 	//NEED ANOTHER FOR LOOP? 
	// 	for (var j = 0; j < search.length; j ++ ) {
	// 		// this.searches.push($rootScope.user.day[i].search);
	// 		console.log("SEARCH ITERATION ", $rootScope.user.day[i].search[j]);
	// 		this.searches.push($rootScope.user.day[i].search[j])
	// 	}	
	// }

	// this.showUser = function() {
	// 	console.log($rootScope.user);
	// }

		// this.sendData = function() {
	// 	console.log(this.query1);
	// 	console.log(this.query2);
	// 	console.log(this.notes);
	// }
