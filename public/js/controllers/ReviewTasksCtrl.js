angular.module('ReviewTasksCtrl', []).controller('ReviewTasksController', function($scope, $location, Iterations) {
	
	  $scope.iterationTitle
	  $scope.startDate
	  $scope.endDate
  	$scope.owner
  	$scope.isOwner
  	$scope.storyTitle

  	$scope.workingTasks = {}
  	$scope.cachedTasks = {}

  	var currentIterationID = $location.path().split('/')[2];
  	var currentStoryID = $location.path().split('/')[3];

  	var checkOwner = function() {
	    var user = firebase.auth().currentUser;
	    if (user) {
	      if (user.uid == $scope.owner) {
	        $scope.isOwner = true;
	      }
	    }
  	}

  	Iterations.getIterationHeader(currentIterationID).then(function(data) {
  		$scope.iterationTitle = data.title
  		$scope.startDate = data.startDate
  		$scope.endDate = data.endDate
  		$scope.owner = data.owner

  		checkOwner();
  	})

  	Iterations.getTasks(currentIterationID, currentStoryID).then(function(data){

  		$scope.workingTasks = data
  		$scope.cachedTasks = angular.copy($scope.workingTasks)
    
  	})

  	Iterations.getStoriesTitlesObject(currentIterationID).then(function(data){
  		$scope.storyTitle = data[currentStoryID].title;
  	})

  	$scope.confirmTasks = function() {
  		if ($scope.workingTasks != $scope.cachedTasks) {
  			Iterations.updateTasks(currentIterationID, currentStoryID, $scope.workingTasks)
  		}
  		Iterations.endTaskReview(currentIterationID, currentStoryID);
  	}

  	firebase.database().ref('iterations/' + currentIterationID + '/storiesObject/stories/' + currentStoryID + "/finishedReview")
    .on('value', function(data) {
        if (data.val() == true) {
          Iterations.startEstimationPolling(currentIterationID, currentStoryID);
          $location.path('/story-estimation-polling/' + currentIterationID + "/" + currentStoryID);
          $scope.$apply();
        }
    });

});