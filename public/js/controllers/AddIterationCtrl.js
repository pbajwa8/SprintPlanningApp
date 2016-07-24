angular.module('AddIterationCtrl', []).controller('AddIterationController', function($scope, $location, Iterations, $cookies) {

	$scope.iterationTitle
	$scope.startDate
	$scope.endDate
	$scope.teamSize
	$scope.teamMembers = []
	$scope.teamMemberEmails = []

	firebase.auth().signInAnonymously().catch(function(error) {
  		console.log("ERROR")
	});

	$scope.createTeamMembersArray = function() {

		$scope.teamMembers = []

		for (i = 0; i < $scope.teamSize; i++) {

			$scope.teamMembers.push({id : i, email: " "})
		}
	}

	$scope.addIteration = function() {

		var user = firebase.auth().currentUser;

		var startDate = $scope.startDate.toString();

		var endDate = $scope.endDate.toString();

		for (i = 0; i < $scope.teamMembers.length; i++) {
			$scope.teamMemberEmails.push($scope.teamMembers[i].email)
		}

		var itID = Iterations.addIteration(user.uid, $scope.iterationTitle, startDate, endDate, $scope.teamMemberEmails)

		$cookies.put("current_iteration", itID);

		var path = '/start-meeting/'.concat(itID);

		$location.path(path)
	}

	firebase.auth().onAuthStateChanged(function(user) {

	});

});
