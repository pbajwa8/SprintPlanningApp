angular.module('HomeCtrl', []).controller('HomeController', function($scope, $location) {

	$scope.email;
	$scope.password;

	$scope.signIn = function() {

    var email = $scope.email;
    var password = $scope.password;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code
      var errorMessage = error.message
      console.log("Error")
      console.log(errorCode)
      console.log(errorMessage)
    });

  };
	
	firebase.auth().onAuthStateChanged(function(user) {
  		if (user) {
    		$location.path('/add-iteration');
        $scope.$apply();
  		}
	});

});
