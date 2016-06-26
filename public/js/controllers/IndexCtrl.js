angular.module('IndexCtrl', []).controller('IndexController', function($scope, $location) {

  $scope.showUserActions;
  $scope.displayFirstName;

  $scope.signOut = function() {
    $scope.showUserActions = false;
    $scope.displayFirstName = "";
    firebase.auth().signOut();
  }

	firebase.auth().onAuthStateChanged(function(user) {

  		if (user) {
        $scope.showUserActions = true;
        var displayName = user.displayName;
        var splitName = displayName.split(" ", 2);
        $scope.displayFirstName = splitName[0];
        $scope.$apply();
  		}; 

	});

});
