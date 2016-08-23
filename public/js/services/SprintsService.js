angular.module('SprintsService', []).factory('Sprints', function($q, $http, $firebaseArray, Stories) {

	var rootSprintsRef = firebase.database().ref("sprints")

	var saveSprint = function(title, owner, startDate, endDate, team, storiesData) {

		var sprintObj = {"title": title, "owner": owner, "status": "created", "startDate": startDate, "endDate": endDate, "team": team}

		var sprintId = rootSprintsRef.push().key

		rootSprintsRef.child(sprintId).update(sprintObj).catch(function(error){
			console.log(error)
		}).then(function(data) {
			Stories.saveStoriesFromDoc(storiesData, sprintId)
		})

		return sprintId
	}

	return {

		saveSprint: saveSprint

	}

});