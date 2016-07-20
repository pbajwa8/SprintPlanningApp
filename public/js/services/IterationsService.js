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

		var storiesObject = {
			"polling": false,
			"finishedPolling": false,
			"finishedReview": false
		}

		firebase.database().ref('iterations/' + iterationID ).set({
			owner: owner,
			title: title,
			startDate: startDate,
			endDate: endDate,
			team: team,
			presentMembers: [owner],
			meetingStarted: false,
			storiesObject: storiesObject
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

		firebase.database().ref('iterations/' + iterationID).once("value")
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

	var startMeeting = function(iterationID) {

		firebase.database().ref('iterations/' + iterationID ).update({
			meetingStarted: true
		})
		.catch(function(error){
			console.log(error)
		})
	}

	var getStoriesObject = function(iterationID) {

		var deferred = $q.defer();

		firebase.database().ref('iterations/' + iterationID + '/storiesObject').once("value")
			.then(function(dataSnapshot) {
				var storiesObject = dataSnapshot.val();
				deferred.resolve(storiesObject);
			})
			.catch(function(error) {
				deferred.reject(error);
			});

		return deferred.promise;
	}

	var startStoryPolling = function(iterationID) {

		firebase.database().ref('iterations/' + iterationID + '/storiesObject').update({
			polling: true
		})
		.catch(function(error){
			console.log(error)
		})
	}

	var stopStoryPolling = function(iterationID) {

		firebase.database().ref('iterations/' + iterationID + '/storiesObject').update({
			polling: false
		})
		.catch(function(error){
			console.log(error)
		})
	}

	var saveStory = function(iterationID, title) {

		firebase.database().ref('iterations/' + iterationID + '/storiesObject/' + "stories").push({title})
			.catch(function(error){
				return error
		})
	}

	var saveStories = function(iterationID, stories) {

		for (var i = 0; i < stories.length; i++) {
			var title = stories[i];
			saveStory(iterationID, title)
		}

	}

	var endStoryPolling = function(iterationID) {

		firebase.database().ref('iterations/' + iterationID + '/storiesObject').update({
			finishedPolling: true
		})
		.catch(function(error){
			console.log(error)
		})

	}

	var getStoriesTitlesObject = function(iterationID) {

		var deferred = $q.defer();

		firebase.database().ref('iterations/' + iterationID + '/storiesObject/stories').once("value")
			.then(function(dataSnapshot) {
				var stories = dataSnapshot.val();
				deferred.resolve(stories);
			})
			.catch(function(error) {
				deferred.reject(error);
			});

		return deferred.promise;

	}

	var updateStories = function(iterationID, storiesTitlesObject) {

		firebase.database().ref('iterations/' + iterationID + '/storiesObject').update({
			stories: storiesTitlesObject
		})
		.catch(function(error){
			console.log(error)
		})

	}

	var endStoryReview = function(iterationID) {

		firebase.database().ref('iterations/' + iterationID + '/storiesObject').update({
			finishedReview: true
		})
		.catch(function(error){
			console.log(error)
		})
	}

	return {

		addIteration: addIteration,
		getIteration: getIteration,
		sendMeetingInvites: sendMeetingInvites,
		startMeeting: startMeeting,
		addToPresentMembers: addToPresentMembers,
		getStoriesObject: getStoriesObject,
		startStoryPolling: startStoryPolling,
		stopStoryPolling: stopStoryPolling,
		saveStories: saveStories,
		endStoryPolling: endStoryPolling,
		getStoriesTitlesObject: getStoriesTitlesObject,
		updateStories: updateStories,
		endStoryReview: endStoryReview
	}

});