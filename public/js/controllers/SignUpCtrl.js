angular.module('SignUpCtrl', []).controller('SignUpController', function($scope, $location) {

	firebase.auth().signOut();

	$scope.email
	$scope.password
	$scope.firstName
	$scope.lastName

	$scope.signUp = function() {

		  var email = $scope.email
		  var password = $scope.password
		  
		  if (email.length < 4) {
		    alert('Please enter a valid email address.');
		    return;
		  }
		  if (password.length < 4) {
		    alert('Please enter a valid password.');
		    return;
		  }

		  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		  		var errorCode = error.code;
		    	var errorMessage = error.message;
		    	if (errorCode == 'auth/weak-password') {
		      		alert('The password is too weak.');
		    	} else {
		      		console.error(error);
		    	}
		  });
	};

    firebase.auth().onAuthStateChanged(function(user) {
  		if (user) {
  			firebase.database().ref('users/' + user.uid).set({
	    		firstName: $scope.firstName,
	    		lastName: $scope.lastName
  			});
    		$location.path('/');
    		$scope.$apply();
  		}
	});

});
