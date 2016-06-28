angular.module('AddIterationCtrl', []).controller('AddIterationController', function($scope, $location, Iterations, $cookies) {

	$scope.iterationTitle
	$scope.startDate
	$scope.endDate
	$scope.teamMember1
	$scope.teamMember2
	$scope.teamMember3
	$scope.teamMembers
	
	$scope.addIteration = function() {

		$scope.teamMembers = [$scope.teamMember1, $scope.teamMember2, $scope.teamMember3];

		var user = firebase.auth().currentUser;

		var startDate = $scope.startDate.toString();

		var endDate = $scope.endDate.toString();

		var itID = Iterations.addIteration(user.uid, $scope.iterationTitle, startDate, endDate, $scope.teamMembers)

		$cookies.put("current_iteration", itID);

		var path = '/start-meeting/'.concat(itID);

		$location.path(path)
	}

	firebase.auth().onAuthStateChanged(function(user) {

	});

});
