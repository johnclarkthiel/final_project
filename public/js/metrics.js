var app = angular.module('metrics', ['ngRoute']);

app.controller('MetricsController', ['$http', '$scope', '$location', '$rootScope', '$routeParams', function($http,$scope,$location,$rootScope, $routeParams){
	// $http.get('/user/' + $rootScope.user._id).then(function(response){
	// 	$rootScope.user = response.data;
	// });
	// console.log($scope);
	//var for the user's search ratings
	this.ratings = $rootScope.user.ratings;
	//var for the effectiveness of the uer's searchs
	this.efficacy = ($rootScope.user.efficacy / this.ratings.length) * 100;
	//var for the user's searchs
	this.searches = $rootScope.user.searches;
	//var for the user's bored instances
	this.boredInstances = $rootScope.user.bored_instances;
	//var to store ratings
	this.nums = [];
	//for loop to push ratings into num array
	for (var i = 0; i < this.ratings.length; i ++) {
		this.nums.push(parseInt(this.ratings[i]));
	};
	//count var to add up numbers
	this.count = 0;
	//for loop to count up numbers
	for (var i = 0; i < this.nums.length; i++) {
		this.count += this.nums[i];
	};
	//avg of search rating numbers
	this.avg = (this.count / this.nums.length);
	//bored instances per day
	this.boredPerDay = (this.boredInstances / $rootScope.user.day.length);
	//searches per day
	this.searchesPerDay = (this.searches / $rootScope.user.day.length);
	//searchs per bored instnaces
	this.searchesPerBored = (this.searches / this.boredInstances) * 100;
	//user's days
	this.days = $rootScope.user.day; 
	//var to conunt up boredom severity
	this.sevNum = 0;
	//for loop to count up number severity
	for (var i = 0; i < this.days.length; i++) {
		this.sevNum += this.days[i].severity;
	};
	//severity average
	this.sevAvg = (this.sevNum / this.days.length);
	//sorting of the ratings to find median
	this.sortRatings = this.ratings.sort();
	//to be used to find the median in a odd-numbered array
	this.oddArr = Math.round((this.ratings.length / 2));
	//to be used to find the median in an even numbered array
	this.evenArr = (this.ratings.length / 2);
	//sets median var for even and odd numbered arrays
	if (this.nums.length % 2 == 0) {
		this.newNumber = parseInt(this.sortRatings[this.evenArr - 1]) + parseInt(this.sortRatings[this.evenArr]);
		this.median = this.newNumber * 0.5;
	} else {
		this.median = this.sortRatings[this.oddArr - 1];
	};
	//count for standard dev
	this.devCount = 0;

	for (var i = 0; i < this.sortRatings.length; i++) {
		this.devCount += parseInt(this.sortRatings[i]);
	};

	this.devAvg = (this.devCount / this.sortRatings.length);
	// console.log("DEV AVG ", this.devAvg);
	
	this.devSqArr = [];


	for (var i = 0; i <this.sortRatings.length; i++) {
		this.meanDev = (parseInt(this.sortRatings[i]) - this.devAvg) * (parseInt(this.sortRatings[i]) - this.devAvg);
		this.devSqArr.push(this.meanDev);
	};
	// console.log("DEV SQUARE ARRAY ", this.devSqArr);
	
	this.varianceCount = 0;

	for (var i = 0; i < this.devSqArr.length; i++) {
		this.varianceCount += this.devSqArr[i];
	}

	this.variance = (this.varianceCount / this.devSqArr.length);

	this.standardDeviation = Math.sqrt(this.variance);


}]);//end metrics controller