angular.module('ReviewStoriesCtrl', []).controller('ReviewStoriesController', function($scope, $location, Iterations) {

	$scope.iterationTitle
	$scope.startDate
	$scope.endDate
  $scope.owner
  $scope.isOwner
	$scope.workingStories = {}
	$scope.cachedStories = {}

	var currentIterationID = $location.path().split('/')[2];

	Iterations.getIteration(currentIterationID).then(function(data){

	    $scope.iterationTitle = data.title
	    $scope.startDate = data.startDate
	    $scope.endDate = data.endDate
	    $scope.owner = data.owner
	    checkOwner();
    
  	})

  	var checkOwner = function() {
	    var user = firebase.auth().currentUser;
	    if (user) {
	      if (user.uid == $scope.owner) {
	        $scope.isOwner = true;
	      }
	    }
  	}

  	Iterations.getStoriesTitlesObject(currentIterationID).then(function(data){
  		$scope.workingStories = data
  		$scope.cachedStories = angular.copy($scope.workingStories);
  	})

  	$scope.confirmStories = function() {
  		if ($scope.workingStories != $scope.cachedStories) {
  			Iterations.updateStories(currentIterationID, $scope.workingStories)
  		}
  		Iterations.endStoryReview(currentIterationID);
  	}

  	firebase.database().ref('iterations/' + currentIterationID + '/storiesObject/finishedReview')
    .on('value', function(data) {
        if (data.val() == true) {
          $location.path('/story-tasks/' + currentIterationID);
          $scope.$apply();
        }
    });


});
