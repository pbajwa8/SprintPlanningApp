angular.module('StoryEstimationReviewCtrl', []).controller('StoryEstimationReviewController', function($scope, $location, Iterations) {
	$scope.iterationTitle
	$scope.startDate
	$scope.endDate
  	$scope.owner
  	$scope.isOwner
    $scope.storyTitle
    $scope.tasks = {}

  	$scope.workingEstimate

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

  	Iterations.getEstimation(currentIterationID, currentStoryID).then(function(data){
  		$scope.workingEstimation = data.toString()
  		$scope.cachedEstimation = angular.copy($scope.workingEstimation)
  	})

  	$scope.confirmEstimation = function() {
  		if (parseInt($scope.workingEstimation) != parseInt($scope.cachedEstimation)) {
  			Iterations.updateEstimation(currentIterationID, currentStoryID, parseInt($scope.workingEstimation))
  		}
  		Iterations.endEstimationReview(currentIterationID, currentStoryID);
  	}

  	firebase.database().ref('iterations/' + currentIterationID + '/storiesObject/stories/' + currentStoryID + "/finishedEstimationReview")
    .on('value', function(data) {
        if (data.val() == true) {
          $location.path('/story-tasks/' + currentIterationID);
          $scope.$apply();
        }
    });

});
