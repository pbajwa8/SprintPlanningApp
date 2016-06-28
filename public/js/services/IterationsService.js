angular.module('IterationsService', []).factory('Iterations', function($q) {

	var generateUUID = function() {

		var d = new Date().getTime();
		var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g,function(c) {
	    	var r = (d + Math.random()*16)%16 | 0;
	    	d = Math.floor(d/16);
	    	return (c=='x' ? r : (r&0x7|0x8)).toString(16);
		});
		return uuid.toUpperCase();
	}

	var addIteration = function(owner, title, startDate, endDate, team) {

		var iterationID = generateUUID();

		firebase.database().ref('iterations/' + iterationID ).set({
			owner: owner,
			title: title,
			startDate: startDate,
			endDate: endDate,
			team: team
		})
		.catch(function(error){
			console.log(error)
		})

		return iterationID

	}

	var getIteration = function(iterationID) {

		var deferred = $q.defer();

		firebase.database().ref('iterations/' + iterationID).orderByKey().once("value")
			.then(function(dataSnapshot) {
				var iteration = dataSnapshot.val();
				deferred.resolve(iteration);
			})
			.catch(function(error) {
				deferred.reject(error);
			});

		return deferred.promise;
	}

	return {

		addIteration: addIteration,
		getIteration: getIteration

	}

});