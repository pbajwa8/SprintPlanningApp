angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		// home page
		.when('/', {
			templateUrl: 'viewsfromthesix/home.html',
			controller: 'HomeController'
		})
		.when('/add-iteration', {
			templateUrl: 'viewsfromthesix/add-iteration.html',
			controller: 'AddIterationController'
		})
		.when('/start-meeting/:meetingID', {
			templateUrl: 'viewsfromthesix/start-meeting.html',
			controller: 'StartMeetingController'
		})

	$locationProvider.html5Mode(true);

}]);
