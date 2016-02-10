'use strict';

/* CONTROLLERS */

var webresponseControllers = angular.module('webresponseControllers', []);


webresponseControllers.controller('MessageCtrl', ['$scope', '$location', '$routeParams', 'messages', function($scope, $location, $routeParams, messages) {

	messages.getMessage($routeParams.messageId).then(function(message) {
		// console.log(message);
		messages.setCurMessage(message);
	}, function(error) {
		// console.log(error);
	});

	$scope.setCurMessage = function(message) {
		var newpath = '';
		if (message != messages.getCurMessage()) {
			messages.setCurMessage(message);
			newpath = message.id;
		} else {
			messages.setCurMessage(null);
		}
		// console.log(messages.curMessage);
		// console.log($routeParams);
		$location.path('/messages/' + newpath, false);
	};

}]);

webresponseControllers.controller('MessageListCtrl', ['$scope', 'messages', function($scope, messages) {
	$scope.messages = messages.list;
	$scope.query = '';
	$scope.show = 'All';
	$scope.folder = 'inbox';

	$scope.setMessagesUnread = function() {
		$scope.messages.map(function(message) {
			if (!message.status.selected) {
				message.status.unread = true;
			}
		});
		if (messages.getCurMessage() !== null) {
			messages.getCurMessage().status.unread = true;
		}
	};

	$scope.setMessagesRead = function() {
		$scope.messages.map(function(message) {
			if (message.status.selected) {
				message.status.unread = false;
			}
		});
		if (messages.getCurMessage() !== null) {
			messages.getCurMessage().status.unread = false;
		}
	};

	$scope.clearSelected = function() {
		$scope.messages = $scope.messages.map(function(message, i) {
			message.status.selected = false;
			return message;
		});
		$scope.curMessage = null;
	};

	$scope.moveMessageTo = function(message, dest) {
		message.folder = dest;
	};

	$scope.setMessageFolder = function(folder) {
		$scope.folder = folder;
	};

	$scope.folderFilter = function(message) {
		return (message.folder === $scope.folder);
	};

	$scope.setListFilter = function(filt) {
		$scope.show = filt;
	};

	$scope.statusFilter = function(message) {
		var flag = true;
		switch ($scope.show) {
			case "Unread":
				flag = message.status.unread;
				break;
			case "unreplied":
				flag = !message.status.repliedTo;
				break;
			case "All":
			default:
				flag = true;
		}
		return flag;
	};

	messages.loadMessages().then(function(success) {
		$scope.messages = success.data;
	}, function(error) {
		console.log(error);
	});

}]);


webresponseControllers.controller('MessageViewCtrl', ['$scope', 'messages', function($scope, messages) {

	$scope.message = messages.curMessage;

	$scope.$watch(function() {
		return ($scope.message !== messages.curMessage);
	}, function(newMessage, oldMessage, scope) {
		$scope.message = messages.curMessage;
	});

	$scope.moveMessageTo = function(message, dest) {
		message.folder = dest;
	};

}]);

webresponseControllers.controller('MessageForwardingCtrl', ['$scope', '$location', '$routeParams', 'messages', '$http', function($scope, $location, $routeParams, messages, $http) {
	$scope.message = messages.curMessage;
	//

	messages.getMessage($routeParams.messageId).then(function(message) {
		// console.log(message);
		messages.setCurMessage(message);
	}, function(error) {
		// console.log(error);
	});

	// $scope.setCurMessage = function(message) {
	// 	var newpath = '';
	// 	if (message != messages.getCurMessage()) {
	// 		messages.setCurMessage(message);
	// 		newpath = message.id;
	// 	} else {
	// 		messages.setCurMessage(null);
	// 	}
	// 	// console.log(messages.curMessage);
	// 	// console.log($routeParams);
	// 	$location.path('/messages/' + newpath, false);
	// };

}]);

webresponseControllers.controller('LoginCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.loggedIn = false;

}]);
