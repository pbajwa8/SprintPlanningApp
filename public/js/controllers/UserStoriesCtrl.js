angular.module('UserStoriesCtrl', []).controller('UserStoriesController', function($scope, $location, Iterations) {

	$scope.iterationTitle
	$scope.startDate
	$scope.endDate
	$scope.teamMembers
  $scope.owner
  $scope.isOwner
  $scope.polling
  $scope.storyTitle
  $scope.memberStories = []

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

    checkOwner();
    
  })

  firebase.database().ref('iterations/' + currentIterationID + '/storiesObject')
  .orderByKey().equalTo('polling').on('value', function(data) {
      if (data.val().polling == false) {
          $scope.storyTitle = "";
          $scope.memberStories = [];
      } else {
          $scope.polling = true;
      }
      $scope.$apply();
  });

  $scope.startPolling = function() {
    Iterations.startStoryPolling(currentIterationID);
  }

  $scope.resetPolling = function() {
    $scope.storyTitle = ""
    $scope.memberStories = []
    Iterations.stopStoryPolling(currentIterationID);
  }

  $scope.endPolling = function() {
    Iterations.endStoryPolling(currentIterationID);
  }

  $scope.addStory = function() {
    $scope.memberStories.push($scope.storyTitle)
    $scope.storyTitle = ""
  }

  firebase.database().ref('iterations/' + currentIterationID + '/storiesObject/finishedPolling')
  .on('value', function(data){
    if (data.val() == true) {
        Iterations.saveStories(currentIterationID, $scope.memberStories)
        Iterations.stopStoryPolling(currentIterationID)
        $location.path('/review-stories/' + currentIterationID)
        $scope.$apply()
    } 
  })

  
});
