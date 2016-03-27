var app = angular.module('add-search', ['ngRoute']);

app.controller('SearchController', ['$http', '$scope', '$location', '$rootScope', '$routeParams', function($http,$scope,$location,$rootScope, $routeParams){
	//values for showing movie, book, article, etc. search forms
	this.searchMovies = false;
	this.searchBooks = false;
	this.searchArticles = false;
	//values for results from searches ... initially set to zero
	this.results = null;
	this.bookresults = null;

	//show movie search, cancel previous results
	this.showMovieSearch = function() {
		this.searchMovies = !this.searchMovies
		this.searchBooks = false;
		this.searchArticles = false;
		this.bookresults = null;
		this.articleresults = null;
	};
	//show book search, cancel previous results
	this.showBookSearch = function() {
		this.searchBooks = !this.searchBooks 
		this.searchMovies = false;
		this.searchArticles = false;
		this.results = null;
		this.articleresults = null;
	};
	//show book search
	this.showArticleSearch = function() {
		this.searchArticles = true;
		this.searchBooks = false;
		this.searchMovies = false;
		this.results = null;
		this.bookresults = null;
	};


	this.searchForMovies = function() {
		console.log("SEARCH MOVIES WORKS!");
		console.log(this.movieSearch);
		var controller = this;
		$http.get('http://api.nytimes.com/svc/movies/v2/reviews/search.json?query=' + this.movieSearch + '&api-key=72d465b11810bf799c7bc1d073b5014e:10:51925285').
		then(function(response){
			controller.showResults = true;
			console.log(response);
			controller.results = response.data.results;
			console.log("CONTROLLER RESULTS ", controller.results);
			controller.movieSearch = undefined;
		}, function(err){
			console.log(err)
		});
	};

	this.searchForBooks = function() {
		console.log("SEARCH BOOKS WORKS!");
		console.log(this.bookSearch);
		var controller = this;
		$http.get('http://api.nytimes.com/svc/books/v3/reviews/search.json?author=' + this.bookSearch + '&api-key=41d122abcaa833ff30fe9583273379d3:18:51925285').
		then(function(response){
			controller.showBookResults = true;
			console.log(response);
			controller.bookresults = response.data.results;
			console.log("CONTROLLER RESULTS ", controller.bookresults);
			controller.bookSearch = undefined;
		}, function(err){
			console.log(err)
		});
	};

	this.searchForArticles = function() {
		console.log("SEARCH ARTICLES WORKS!");
		console.log(this.articleSearch);
		var controller = this;
		$http.get('http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + this.articleSearch + '&api-key=05a267cb078d932cbb8605e7a2f17656:16:51925285').
		then(function(response){
			controller.showArticleResults = true;
			console.log(response);
			controller.articleresults = response.data.response.docs;
			console.log("CONTROLLER RESULTS ", controller.articleresults);
			controller.articleSearch = undefined;
		}, function(err){
			console.log(err)
		});
	};

}]);//end search controller