angular.module('AddIterationCtrl', []).controller('AddIterationController', function($scope, $location) {

	firebase.auth().onAuthStateChanged(function(user) {
		if (!user) {
			$location.path('/');
			$scope.$apply();
		}
	});

});
