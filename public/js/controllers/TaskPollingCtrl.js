angular.module('TaskPollingCtrl', []).controller('TaskPollingController', function($scope, $location, Iterations) {

	$scope.iterationTitle
	$scope.startDate
	$scope.endDate
  	$scope.owner
  	$scope.isOwner
  	$scope.polling

  	$scope.taskTitle
  	$scope.userTasks = []

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

  	Iterations.getIteration(currentIterationID).then(function(data){

	    $scope.iterationTitle = data.title
	    $scope.startDate = data.startDate
	    $scope.endDate = data.endDate
	    $scope.owner = data.owner

	    checkOwner();
    
  	})

  	firebase.database().ref('iterations/' + currentIterationID + '/storiesObject/stories/' + currentStoryID + "/polling")
  	.on('value', function(data){
		if (data.val() == false) {
          $scope.taskTitle = "";
          $scope.userTasks = [];
      	} else {
          $scope.polling = true;
      	}
      	$scope.$apply();
  	})

  	$scope.resetPolling = function() {
    	$scope.taskTitle = ""
    	$scope.memberTasks = []
    	Iterations.stopTaskPolling(currentIterationID, currentStoryID);
  	}

  	$scope.endPolling = function() {
    	Iterations.endTaskPolling(currentIterationID, currentStoryID);
  	}

  	$scope.addTask = function() {
    	$scope.userTasks.push($scope.taskTitle)
    	$scope.taskTitle = ""
  	}

  	firebase.database().ref('iterations/' + currentIterationID + '/storiesObject/stories/' + currentStoryID + "/finishedPolling")
  	.on('value', function(data){
		if (data.val() == true) {
			console.log($scope.userTasks)
	        Iterations.saveTasks(currentIterationID, currentStoryID, $scope.userTasks)
	        Iterations.stopTaskPolling(currentIterationID, currentStoryID)
	        $location.path('/story-tasks/' + currentIterationID)
	        $scope.$apply()
	  	} 
  	})

});
