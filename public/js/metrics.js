var app = angular.module('metrics', ['ngRoute']);

app.controller('MetricsController', ['$http', '$scope', '$location', '$rootScope', '$routeParams', function($http,$scope,$location,$rootScope, $routeParams){
	this.ratings = $rootScope.user.ratings;
	this.efficacy = ($rootScope.user.efficacy / this.ratings.length) * 100;
	this.searches = $rootScope.user.searches;
	this.boredInstances = $rootScope.user.bored_instances;
	this.nums = []
	for (var i = 0; i < this.ratings.length; i ++) {
		this.nums.push(parseInt(this.ratings[i]));
	}
	this.count = 0;
	for (var i = 0; i < this.nums.length; i++) {
		this.count += this.nums[i];
	}

	this.avg = (this.count / this.nums.length);

	this.boredPerDay = (this.boredInstances / $rootScope.user.day.length);
	this.searchesPerDay = (this.searches / $rootScope.user.day.length);
	this.searchesPerBored = (this.searches / this.boredInstances) * 100;


}]);//end metrics controller