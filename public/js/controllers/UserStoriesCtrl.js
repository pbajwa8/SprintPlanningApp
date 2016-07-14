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

	currentIterationID = $location.path().split('/')[2];

  var checkOwner = function() {
    var user = firebase.auth().currentUser;
    if (user) {
      if (user.uid == $scope.owner) {
        $scope.isOwner = true;
      }
    }
  }

  $scope.startTimer = function (){
    $scope.$broadcast('timer-start');
  };
  
  $scope.resetTimer = function (){
    $scope.storyTitle = ""
    $scope.memberStories = []
    $scope.$broadcast('timer-clear');
  };

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
      $scope.polling = data.val().polling;
      if ($scope.polling == true) {
          $scope.startTimer();
      } else {
          $scope.resetTimer();
      }
      $scope.$apply();
  });

  $scope.startPolling = function() {
    Iterations.startStoryPolling(currentIterationID);
  }

  $scope.resetPolling = function() {
    Iterations.stopStoryPolling(currentIterationID);
  }

  $scope.addStory = function() {
    $scope.memberStories.push($scope.storyTitle)
    $scope.storyTitle = ""
  }

  $scope.$on('timer-stopped', function (event, args) {
    if ($scope.memberStories.length > 0) {
        $scope.saveStories();
        Iterations.stopStoryPolling(currentIterationID);
        Iterations.endStoryPolling(currentIterationID);
    }
  });

  $scope.saveStories = function() {
    Iterations.saveStories(currentIterationID, $scope.memberStories);
  }

  firebase.database().ref('iterations/' + currentIterationID + '/storiesObject/finishedPolling' )
  .on('value', function(data){
    if (data.val() == true) {
      $location.path('/review-stories/' + currentIterationID)
      $scope.$apply();
    }

  })
   

});
