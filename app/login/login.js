'use strict';

angular.module('webApp.login', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/login', {
		templateUrl: 'login/login.html',
		controller: 'LoginCtrl'
	});
}])

.controller('LoginCtrl', ['$scope','$http', '$firebaseAuth', '$location', 'CommonProp', function($scope, $http, $firebaseAuth, $location, CommonProp){

	$scope.username = CommonProp.getUser();

	if($scope.username){
		$location.path('/welcome');
	}
	$scope.sendOtp=function()
	{
		var username = $scope.user.email;
		
		$http.get("https://kotak-onboard-api.herokuapp.com/otp_generation?email="+username+"&status=dev")
			.success(function (data) {
				console.log(data);
			//  
			//  Do something with the data !
			//  
		});
		
		
	}
$scope.signIn = function(){
		var username = $scope.user.email;
		var password = $scope.user.password;
		if(username=="rahulporwal67@gmail.com" && password=="123456")
		{
			console.log("User Login Successful");
			CommonProp.setUser($scope.user.email);
			$location.path('/welcome');
		}
		else{
			$scope.errMsg = true;
			$scope.errorMessage = error.message;
		}
	}
	// $scope.signIn = function(){
	// 	var username = $scope.user.email;
	// 	var password = $scope.user.password;
	// 	var auth = $firebaseAuth();

	// 	auth.$signInWithEmailAndPassword(username, password).then(function(){
	// 		console.log("User Login Successful");
	// 		CommonProp.setUser($scope.user.email);
	// 		$location.path('/welcome');
	// 	}).catch(function(error){
	// 		$scope.errMsg = true;
	// 		$scope.errorMessage = error.message;
	// 	});
	// }

}])

.service('CommonProp', ['$location', '$firebaseAuth', function($location, $firebaseAuth){
	var user = "";
	var auth = $firebaseAuth();

	return {
		getUser: function(){
			if(user == ""){
				user = localStorage.getItem("userEmail");
			}
			return user;
		},
		setUser: function(value){
			localStorage.setItem("userEmail", value);
			user = value;
		},
		logoutUser: function(){
			auth.$signOut();
			console.log("Logged Out Succesfully");
			user = "";
			localStorage.removeItem('userEmail');
			$location.path('/login');
		}
	};
}]);