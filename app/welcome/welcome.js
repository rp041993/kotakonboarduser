'use strict';

angular.module('webApp.welcome', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/welcome',{
		templateUrl: 'welcome/welcome.html',
		controller: 'WelcomeCtrl'
	});
}])

.controller('WelcomeCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$location', function($scope, CommonProp, $firebaseArray, $firebaseObject, $location){
	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/home');
	}
	$scope.checkIpPunching = function(){
		$.getJSON('http://ipinfo.io', function(data) {
			var jsonData=JSON.stringify(data, null, 2);
			var JSONObject = JSON.parse(jsonData);
			console.log(jsonData);
			var ip=JSONObject.ip
			if(ip=="114.143.188.42" || ip=="27.250.13.74" || ip=="114.79.172.18")	
			{

			}
			else
			{
				$('#myModal').modal('show'); 
			}
		});
	}


	
	// var ref = firebase.database().ref().child('Articles');
	// $scope.articles = $firebaseArray(ref);	

	// $scope.editPost = function(id){
	// 	var ref = firebase.database().ref().child('Articles/' + id);
	// 	$scope.editPostData = $firebaseObject(ref);
	// };

	// $scope.updatePost = function(id){
	// 	var ref = firebase.database().ref().child('Articles/' + id);
	// 	ref.update({
	// 		title: $scope.editPostData.title,
	// 		post: $scope.editPostData.post
	// 	}).then(function(ref){
	// 		$scope.$apply(function(){
	// 			$("#editModal").modal('hide');
	// 		});
	// 	}, function(error){
	// 		console.log(error);
	// 	});
	// };

	// $scope.deleteCnf = function(article){
	// 	$scope.deleteArticle = article;
	// };

	// $scope.deletePost = function(deleteArticle){
	// 	$scope.articles.$remove(deleteArticle);
	// 	$("#deleteModal").modal('hide');
	// };

	$scope.logout = function(){
		CommonProp.logoutUser();
	}
}])