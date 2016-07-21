angular.module('StoryTasksCtrl', []).controller('StoryTasksController', function($scope, $location, Iterations) {

	$scope.iterationTitle
	$scope.startDate
	$scope.endDate
  	$scope.owner
  	$scope.isOwner
  	$scope.stories = {}
  	$scope.currentStory

	var currentIterationID = $location.path().split('/')[2];

  	var checkOwner = function() {
	    var user = firebase.auth().currentUser;
	    if (user) {
	      if (user.uid == $scope.owner) {
	        $scope.isOwner = true;
	      }
	    }
  	}

  	Iterations.getIteration(currentIterationID).then(function(data){

	    $scope.iterationTitle = data.title
	    $scope.startDate = data.startDate
	    $scope.endDate = data.endDate
	    $scope.teamMembers = data.team
	    $scope.owner = data.owner
	    $scope.currentStory = data.storiesObject.currentStory

	    checkOwner();
    
  	})

  	Iterations.getStoriesTitlesObject(currentIterationID).then(function(data){
  		$scope.stories = data;
  	})

  	$scope.startPolling = function(story) {
  		Iterations.updateCurrentStory(currentIterationID, story)
  		Iterations.startTaskPolling(currentIterationID, story)
  	}

  	firebase.database().ref('iterations/' + currentIterationID + '/storiesObject/currentStory')
    .on('value', function(data) {
    	$scope.currentStory = data.val();
    	$scope.$apply();
    });

    firebase.database().ref('iterations/' + currentIterationID + '/storiesObject/stories')
    .on('value', function(data) {
    	var stories = data.val()
    	if (stories[$scope.currentStory].polling) {
    		$location.path('/task-polling/' + currentIterationID + '/' + $scope.currentStory);
          	$scope.$apply();
    	}
    });

});
