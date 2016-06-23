angular.module('AddIterationCtrl', []).controller('AddIterationController', function($scope, $location) {

	$scope.signOut = function() {
		firebase.auth().signOut();
	}

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			return
		} else {
			$location.path('/');
			$scope.$apply();
		}
	});

});
