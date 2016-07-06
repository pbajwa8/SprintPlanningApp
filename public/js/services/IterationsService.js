angular.module('IterationsService', []).factory('Iterations', function($q, $http) {

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
			team: team,
			presentMembers: [owner]
		})
		.catch(function(error){
			console.log(error)
		})

		return iterationID

	}

	var addToPresentMembers = function(iterationID, email) {

		getIteration(iterationID).then(function(data){

			var currentPresentMembers = data.presentMembers;
			currentPresentMembers.push(email)

			firebase.database().ref('iterations/' + iterationID ).update({
				presentMembers: currentPresentMembers
			})
			.catch(function(error){
				console.log(error)
			})
    	})
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

	var sendMeetingInvite = function(teamMemberEmail, iterationID) {

		var baseUrl = "localhost:8080/"

		var urlToSend = baseUrl + "join-meeting/" + iterationID

		var data = {email: teamMemberEmail, url: urlToSend};

		var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }

		$http.post('/send-invite', data, config)
			.success(function (data, status, headers, config) {
                console.log("SUCCESS!!!")
            })
            .error(function (data, status, header, config) {
            	console.log("ERROR!!!")
            });
	}

	var sendMeetingInvites = function(teamMembers, iterationID) {

		for (i = 0; i < teamMembers.length; i++) {
			sendMeetingInvite(teamMembers[i], iterationID)
		}

	}

	return {

		addIteration: addIteration,
		getIteration: getIteration,
		sendMeetingInvites: sendMeetingInvites,
		addToPresentMembers: addToPresentMembers

	}

});