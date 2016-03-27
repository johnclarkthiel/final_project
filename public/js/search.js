var app = angular.module('add-search', ['ngRoute']);

app.controller('SearchController', ['$http', '$scope', '$location', '$rootScope', '$routeParams', function($http,$scope,$location,$rootScope, $routeParams){
	this.searchMovies = false;
	this.searchBooks = false;

	//show movie search
	this.showMovieSearch = function() {
		this.searchMovies = !this.searchMovies
		this.searchBooks = false;
	};
	//show book search
	this.showBookSearch = function() {
		this.searchBooks = !this.searchBooks 
		this.searchMovies = false;
	};

	this.searchForMovies = function() {
		console.log("SEARCH MOVIES WORKS!");
		console.log(this.movieSearch);
		var controller = this;
		$http.get('http://api.nytimes.com/svc/movies/v2/reviews/search.json?query=' + this.movieSearch + '&api-key=72d465b11810bf799c7bc1d073b5014e:10:51925285').
		then(function(response){
			controller.showResults = true;
			console.log(response);
			controller.results = response.data;
			console.log("CONTROLLER RESULTS ", controller.results);
		}, function(err){
			console.log(err)
		});
	};

	this.searchForBooks = function() {
		console.log("SEARCH BOOKS WORKS!");
		console.log(this.bookSearch);
		$http.get('http://api.rottentomatoes.com/api/public/v1.0/movies/770672122/reviews.json?apikey=pcb64qevhv27w3atf5aenpkm').
		then(function(response){
			console.log(response);
		}, function(err){
			console.log(err)
		});
	};

}]);//end search controller