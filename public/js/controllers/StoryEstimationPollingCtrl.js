angular.module('StoryEstimationPollingCtrl', []).controller('StoryEstimationPollingController', function($scope, $location, Iterations) {
	
	$scope.iterationTitle
	$scope.startDate
	$scope.endDate
  	$scope.owner
  	$scope.isOwner
  	$scope.polling
    $scope.storyTitle
    $scope.tasks = {}

  	$scope.userEstimate

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
  		$scope.tasks = data
  	})

  	Iterations.getStoriesTitlesObject(currentIterationID).then(function(data){
  		$scope.storyTitle = data[currentStoryID].title;
  	})

  	firebase.database().ref('iterations/' + currentIterationID + '/storiesObject/stories/' + currentStoryID + "/estimationPolling")
  	.on('value', function(data){
		    if (data.val() == false) {
          $scope.polling = false
          $scope.userEstimate = 0
      	} else {
          $scope.polling = true;
      	}
      	$scope.$apply();
  	})

  	$scope.resetPolling = function() {
  		$scope.userEstimate = 0
  		Iterations.stopEstimationPolling(currentIterationID, currentStoryID);
  	}

  	$scope.endPolling = function() {
  		Iterations.endEstimationPolling(currentIterationID, currentStoryID);
  	}

    $scope.startPolling = function() {
      Iterations.startEstimationPolling(currentIterationID, currentStoryID);
    }

  	firebase.database().ref('iterations/' + currentIterationID + '/storiesObject/stories/' + currentStoryID + "/finishedEstimationPolling")
  	.on('value', function(data){
		if (data.val() == true) {
		    Iterations.saveEstimation(currentIterationID, currentStoryID, parseInt($scope.userEstimate))
        Iterations.saveCalculatedEstimation(currentIterationID, currentStoryID)
        Iterations.stopEstimationPolling(currentIterationID, currentStoryID)
        $location.path('/story-estimation-review/' + currentIterationID + '/' + currentStoryID)
        $scope.$apply()
	  	} 
  	})

});
