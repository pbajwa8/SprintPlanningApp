angular.module('StoriesService', []).factory('Stories', function($q, $firebaseArray, $http, Upload) {

	var rootStoriesRef = firebase.database().ref("stories")

	var storyDocToJSON = function(storiesData) {
		var deferred = $q.defer();

		Upload.upload({
  			url: PARSE_DOC_URL,
  			data: {file: storiesData}
		}).then(function(resp) {
			if (resp.status == 200) {
				console.log("Successfully parsed stories from document")
				deferred.resolve(resp.data);
			} else {
				console.log("Error: could not parse stories from document")
				deferred.resolve([])
			}
		})

		return deferred.promise;
	};

	var saveStoriesFromDoc = function(storiesData, sprintId) {

		storyDocToJSON(storiesData).then(function(data){
			var storiesArray = data
			for (i in storiesArray) {
				var story = storiesArray[i]
				saveNewStory(sprintId, story)
			}
		});

	};

	var saveNewStory = function(sprintId, story) {
		var storyId = rootStoriesRef.child(sprintId).push().key
		rootStoriesRef.child(sprintId).child(storyId).update(story).catch(function(error){
			console.log(error)
		}).then(function(data){
			return storyId
		})
	}

	return {

		saveStoriesFromDoc: saveStoriesFromDoc,
		saveNewStory: saveNewStory

	}

});