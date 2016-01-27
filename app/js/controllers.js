'use strict';

/* CONTROLLERS */

var webresponseControllers = angular.module('webresponseControllers', []);


webresponseControllers.controller('MessageCtrl', ['$scope', '$routeParams', 'messages', function($scope, $routeParams, messages) {

	messages.getMessage($routeParams.messageId).then(function(message) {
		// console.log(message);
		messages.setCurMessage(message);
	}, function(error) {
		// console.log(error);
	});

}]);

// webresponseControllers.controller('MessageCtrl', ['$scope', '$routeParams', 'messages', function($scope, $routeParams, messages) {
// 	$scope.query = '';
// 	$scope.show = 'All';
// 	$scope.folder = 'inbox';
// 	$scope.orderProp = 'subject';
// 	$scope.messagesPage = 0;
// 	$scope.messages = [];
// 	$scope.selectedMessages = [];
// 	$scope.curMessage = null;
//
// 	$scope.viewMessage = function(clickedMessage) {
// 		// Select (or de-select) clickedMessage
// 		if ($scope.curMessage == clickedMessage) {
// 			$scope.curMessage = null;
// 		} else {
// 			$scope.curMessage = clickedMessage;
// 		}
// 		clickedMessage.status.unread = false;
// 	};
//
// 	$scope.setMessagesUnread = function() {
// 		$scope.messages.map(function(message) {
// 			if (!message.status.selected) {
// 				message.status.unread = true;
// 			}
// 		});
// 		if (messages.getCurMessage() !== null) {
// 			messages.getCurMessage().status.unread = true;
// 		}
// 	};
//
// 	$scope.setMessagesRead = function() {
// 		$scope.messages.map(function(message) {
// 			if (message.status.selected) {
// 				message.status.unread = false;
// 			}
// 		});
// 		if (messages.getCurMessage() !== null) {
// 			messages.getCurMessage().status.unread = false;
// 		}
// 	};
//
//
// 	$scope.clearSelected = function() {
// 		$scope.messages = $scope.messages.map(function(message, i) {
// 			message.status.selected = false;
// 			return message;
// 		});
// 		$scope.curMessage = null;
// 	};
//
// 	$scope.moveMessageTo = function(message, dest) {
// 		message.folder = dest;
// 	};
//
// 	$scope.setFolder = function(folder) {
// 		$scope.folder = folder;
// 	};
//
// 	$scope.folderFilter = function(message) {
// 		return (message.folder === $scope.folder);
// 	};
//
// 	$scope.setFilter = function(filt) {
// 		$scope.show = filt;
// 	};
//
// 	$scope.statusFilter = function(message) {
// 		var flag = true;
// 		switch ($scope.show) {
// 			case "Unread":
// 				flag = message.status.unread;
// 				break;
// 			case "unreplied":
// 				flag = !message.status.repliedTo;
// 				break;
// 			case "All":
// 			default:
// 				flag = true;
// 		}
// 		return flag;
// 	};
//
//     messages.loadMessages().success(function(data) {
// 		$scope.messages = data.data;
// 	}).error(function(error) {
// 		console.log("Error: " + error);
// 	});
//
// }]);

webresponseControllers.controller('MessageListCtrl', ['$scope', 'messages', function($scope, messages) {
	$scope.messages = messages.list;
	$scope.query = '';
	$scope.show = 'All';
	$scope.folder = 'inbox';

	$scope.setCurMessage = function(message) {
		if (message != messages.getCurMessage()) {
			messages.setCurMessage(message);
		} else {
			messages.setCurMessage(null);
		}
		// console.log(messages.curMessage);
	};

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

webresponseControllers.controller('LoginCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.loggedIn = false;

}]);
