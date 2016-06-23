angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		// home page
		.when('/', {
			templateUrl: 'viewsfromthesix/home.html',
			controller: 'HomeController'
		})
		.when('/signup', {
			templateUrl: 'viewsfromthesix/signup.html',
			controller: 'SignUpController'
		})
		.when('/add-iteration', {
			templateUrl: 'viewsfromthesix/add-iteration.html',
			controller: 'AddIterationController'
		})

	$locationProvider.html5Mode(true);

}]);
