angular.module('UserStoriesCtrl', []).controller('UserStoriesController', function($scope, $location, Iterations) {

	$scope.iterationTitle
	$scope.startDate
	$scope.endDate
	$scope.teamMembers

	currentIterationID = $location.path().split('/')[2];

	Iterations.getIteration(currentIterationID).then(function(data){

      $scope.iterationTitle = data.title
      $scope.startDate = data.startDate
      $scope.endDate = data.endDate
      $scope.teamMembers = data.team
      
    })

});
