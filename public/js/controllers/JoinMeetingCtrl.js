angular.module('JoinMeetingCtrl', []).controller('JoinMeetingController', function($scope, $location, $cookies, Iterations) {

	var currentIterationID = $location.path().split('/')[2]

	$cookies.put("current_iteration", currentIterationID);

	$scope.email

	$scope.enterMeeting = function() {

		Iterations.addToPresentMembers(currentIterationID, $scope.email)
		$location.path('/start-meeting/' + currentIterationID)

	}

});
