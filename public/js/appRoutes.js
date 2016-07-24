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
		.when('/review-stories/:meetingID', {
			templateUrl: 'viewsfromthesix/review-stories.html',
			controller: 'ReviewStoriesController'
		})
		.when('/story-tasks/:meetingID', {
			templateUrl: 'viewsfromthesix/story-tasks.html',
			controller: 'StoryTasksController'
		})
		.when('/task-polling/:meetingID/:storyID', {
			templateUrl: 'viewsfromthesix/task-polling.html',
			controller: 'TaskPollingController'
		})

	$locationProvider.html5Mode(true);

}]);
