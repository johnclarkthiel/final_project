var app = angular.module('metrics', ['ngRoute']);

app.controller('MetricsController', ['$http', '$scope', '$location', '$rootScope', '$routeParams', function($http,$scope,$location,	$rootScope, $routeParams){


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

			//D3 example
	var chartData = [4, 8, 15, 16, 23, 42];
	d3.select(".chartExample")
  .selectAll("div")
    .data(chartData)
  .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; });

	var width = 420;
	var barHeight = 20;

	var x = d3.scaleLinear().domain([0, d3.max(chartData)]).range([0, width]);

	var chart = d3.select(".chartExampleTwo").attr("width", width).attr("height", barHeight * chartData.length);

	var bar = chart.selectAll("g").data(chartData).enter().append("g")
	.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

	bar.append("rect").attr("width", x).attr("height", barHeight - 1);

	bar.append("text").attr("x", function(d) { return x(d) - 3; }).attr("y", barHeight / 2).attr("dy", ".35em").text(function(d) { return d; });
//////////////////////////
	d3.tsv("./data.tsv", function(err,d){
		console.log(d);
		console.log(err);
	});
	/////////////
// var width = 420;
// var barHeight = 20;

// var x = d3.scaleLinear()
//     .range([0, width]);

// var chart = d3.select(".chartExampleThree")
//     .attr("width", width);

// d3.tsv("./data.tsv", type, function(error, data) {
//   x.domain([0, d3.max(data, function(d) { return d.value; })]);

//   chart.attr("height", barHeight * data.length);

//   var bar = chart.selectAll("g")
//       .data(data)
//     .enter().append("g")
//       .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

//   bar.append("rect")
//       .attr("width", function(d) { return x(d.value); })
//       .attr("height", barHeight - 1);

//   bar.append("text")
//       .attr("x", function(d) { return x(d.value) - 3; })
//       .attr("y", barHeight / 2)
//       .attr("dy", ".35em")
//       .text(function(d) { return d.value; });
// });

// function type(d) {
//   d.value = +d.value; // coerce to number
//   return d;
// }

///////////////////

var width = 960;
var height = 500;

var y = d3.scaleLinear()
    .range([height, 0]);

var chart = d3.select(".chartExampleFour")
    .attr("width", width)
    .attr("height", height);

d3.tsv("./data.tsv", type, function(error, data) {
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  var barWidth = width / data.length;

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

  bar.append("rect")
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", barWidth - 1);

  bar.append("text")
      .attr("x", barWidth / 2)
      .attr("y", function(d) { return y(d.value) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d.value; });
});

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}


}]);//end metrics controller