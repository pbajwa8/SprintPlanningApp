angular.module('JoinMeetingCtrl', []).controller('JoinMeetingController', function($scope, $location, $cookies, Iterations) {

	var currentIterationID = $location.path().split('/')[2]

	firebase.auth().signInAnonymously().catch(function(error) {
  		console.log("ERROR")
	});

	$scope.email

	$scope.enterMeeting = function() {

		Iterations.addToPresentMembers(currentIterationID, $scope.email)
		$location.path('/start-meeting/' + currentIterationID)

	}

});
