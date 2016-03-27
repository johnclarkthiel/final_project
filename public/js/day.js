var app = angular.module('add-day', ['ngRoute']);

app.controller('DayController', ['$http', '$scope', '$location', '$rootScope', '$routeParams', function($http,$scope,$location,$rootScope, $routeParams){
	this.showBored = true;
	this.showBoredForm = false;	

	this.boredForm = function() {
		this.showBored = !this.showBored;
		this.showBoredForm = !this.showBoredForm;
	};

	this.addDay = function() {
		console.log('ADD DAY BUTTON WORKING');
		console.log($rootScope.user);
		console.log($scope);
		var day = this.day;
		console.log("DAY ", day);
		$http.post('/user/' + $rootScope.user._id, {day: this.day, description: this.description, severity: this.severity}).then(function(response){
			console.log(response);
		},
		function(err){
			console.log(err);
		})
	};

}]);//end Day controller