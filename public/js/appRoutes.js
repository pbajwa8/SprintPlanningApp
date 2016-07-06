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
		.when('/join-meeting/:meetingID', {
			templateUrl: 'viewsfromthesix/join-meeting.html',
			controller: 'JoinMeetingController'
		})
		.when('/user-stories/:meetingID', {
			templateUrl: 'viewsfromthesix/user-stories.html',
			controller: 'UserStoriesController'
		})

	$locationProvider.html5Mode(true);

}]);
