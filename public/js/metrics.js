var app = angular.module('metrics', ['ngRoute']);

app.controller('MetricsController', ['$http', '$scope', '$location', '$rootScope', '$routeParams', function($http,$scope,$location,$rootScope, $routeParams){
	this.ratings = $rootScope.user.ratings;
	this.efficacy = $rootScope.user.efficacy;
	this.searches = $rootScope.user.searches;
	this.boredInstances = $rootScope.user.bored_instances;

}]);//end metrics controller