angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		// home page
		.when('/', {
			templateUrl: 'viewsfromthesix/home.html',
			controller: 'HomeController'
		})
		.when('/add-sprint', {
			templateUrl: 'viewsfromthesix/add-sprint.html',
			controller: 'AddSprintController'
		})
		
	$locationProvider.html5Mode(true);

}]);
