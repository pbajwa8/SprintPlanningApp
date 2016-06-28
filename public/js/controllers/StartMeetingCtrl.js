angular.module('StartMeetingCtrl', []).controller('StartMeetingController', function($scope, $location, Iterations, $cookies) {

    $scope.iterationTitle;
    $scope.startDate;
    $scope.endDate;
    $scope.teamMembers;

    currentIterationID = $cookies.get("current_iteration");
    

    if (currentIterationID == null || currentIterationID == undefined) {
        $cookies.put("current_iteration", $location.path().split('/')[2]);
        currentIterationID = $location.path().split('/')[2]
    }

    Iterations.getIteration(currentIterationID).then(function(data){

      $scope.iterationTitle = data.title
      $scope.startDate = data.startDate
      $scope.endDate = data.endDate
      $scope.teamMembers = data.team
      
    })

  	firebase.auth().onAuthStateChanged(function(user) {

    });

});
