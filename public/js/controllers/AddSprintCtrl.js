angular.module('AddSprintCtrl', []).controller('AddSprintController', function($scope, $location, Upload, Sprints) {

	$scope.sprintTitle
	$scope.startDate
	$scope.endDate
	$scope.teamMembersObject = [{"email": ""}]
	$scope.storyData

	firebase.auth().signInAnonymously().catch(function(error) {
  		console.log("ERROR")
	});

	$scope.addMemberField = function() {
		$scope.teamMembersObject.push({"email": ""})
	}

	$scope.removeMemberField = function(memberIndex) {
		$scope.teamMembersObject.splice(memberIndex, 1)
	}

	$scope.addSprint = function() {
		var title = $scope.sprintTitle
		var owner = firebase.auth().currentUser.uid;
		var startDate = $scope.startDate.toLocaleDateString();
		var endDate = $scope.endDate.toLocaleDateString();
		var members = []
		$scope.teamMembersObject.forEach(function(member) {
			members.push(member.email)
		})
		var stories = $scope.storyData

		Sprints.saveSprint(title, owner, startDate, endDate, members, stories)
	}

});
