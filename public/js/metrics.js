var app = angular.module('metrics', ['ngRoute']);

app.controller('MetricsController', ['$http', '$scope', '$location', '$rootScope', '$routeParams', function($http,$scope,$location,$rootScope, $routeParams){
	// $http.get('/user/' + $rootScope.user._id).then(function(response){

	// });
	// console.log($scope);

	this.ratings = $rootScope.user.ratings;
	this.efficacy = ($rootScope.user.efficacy / this.ratings.length) * 100;
	this.searches = $rootScope.user.searches;
	this.boredInstances = $rootScope.user.bored_instances;
	this.nums = []
	for (var i = 0; i < this.ratings.length; i ++) {
		this.nums.push(parseInt(this.ratings[i]));
	};

	this.count = 0;

	for (var i = 0; i < this.nums.length; i++) {
		this.count += this.nums[i];
	};

	this.avg = (this.count / this.nums.length);

	this.boredPerDay = (this.boredInstances / $rootScope.user.day.length);
	this.searchesPerDay = (this.searches / $rootScope.user.day.length);
	this.searchesPerBored = (this.searches / this.boredInstances) * 100;

	this.days = $rootScope.user.day; 
	this.sevNum = 0;

	for (var i = 0; i < this.days.length; i++) {
		this.sevNum += this.days[i].severity;
	};

	this.sevAvg = (this.sevNum / this.days.length);

	this.sortRatings = this.ratings.sort();
	this.oddArr = Math.round((this.ratings.length / 2));
	this.evenArr = (this.ratings.length / 2);

	if (this.nums.length % 2 == 0) {
		this.newNumber = parseInt(this.sortRatings[this.evenArr - 1]) + parseInt(this.sortRatings[this.evenArr]);
		this.median = this.newNumber * 0.5;
	} else {
		this.median = this.sortRatings[this.oddArr - 1];
	};

}]);//end metrics controller