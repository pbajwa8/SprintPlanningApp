angular.module('StartMeetingCtrl', []).controller('StartMeetingController', function($scope, $location, Iterations, $cookies) {

    $scope.iterationTitle;
    $scope.startDate;
    $scope.endDate;
    $scope.owner;
    $scope.teamMembers = []
    $scope.presentTeamMembers = []
    $scope.teamInvited = false
    $scope.teamPresent = false
    $scope.isOwner = false

    currentIterationID = $cookies.get("current_iteration");
    
    if (currentIterationID == null || currentIterationID == undefined) {
        $cookies.put("current_iteration", $location.path().split('/')[2]);
        currentIterationID = $location.path().split('/')[2]
    }

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

      checkOwner()
      
    })

    var checkMeetingStatus = function() {

      if ($scope.teamMembers.length == 0) {
        return;
      }

      for (i = 0; i < $scope.teamMembers.length; i++) {
          if ($.inArray($scope.teamMembers[i], $scope.presentTeamMembers) == -1) {
            $scope.teamPresent = false;
            return;
          }
      }

      $scope.teamPresent = true;
      $scope.$apply()

    }

    firebase.database().ref('iterations/' + currentIterationID + '/presentMembers').on('child_added', function(data) {
        $scope.presentTeamMembers.push(data.val())
        checkMeetingStatus()
    });

    $scope.inviteTeam = function() {
      Iterations.sendMeetingInvites($scope.teamMembers, currentIterationID)
      $scope.teamInvited = true
    }

    $scope.checkMemberStatus = function(member) {
      if ($.inArray(member, $scope.presentTeamMembers) != -1) {
          return true
      } else {
        return false
      }
    }

    $scope.startMeeting = function() {
      Iterations.startMeeting(currentIterationID);
    }

    firebase.database().ref('iterations/' + currentIterationID + '/meetingStarted').on('value', function(data) {
        if (data.val() == true) {
          $location.path('/user-stories/' + currentIterationID)
          $scope.$apply()
        }
    });

  	firebase.auth().onAuthStateChanged(function(user) {

    });

});
