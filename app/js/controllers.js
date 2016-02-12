'use strict';

/* CONTROLLERS */

var webresponseControllers = angular.module('webresponseControllers', []);


webresponseControllers.controller('MessageCtrl', ['$scope', '$location', '$routeParams', 'messages', 'auth', function($scope, $location, $routeParams, messages, auth) {
	$scope.messagesPage = 0;
	messages.getMessage($routeParams.messageId).then(function(message) {
		// console.log(message);
		messages.setCurMessage(message);
	}, function(error) {
		// console.log(error);
	});

	$scope.setCurMessage = function(message) {
		var oldMessage = messages.getCurMessage();
		if (oldMessage != null) {
			oldMessage.status.open = false;
		}
		var newPath = '';
		if (message != oldMessage) {
			messages.setCurMessage(message);
			newPath = message.id;
			message.status.open = true;
		} else {
			messages.setCurMessage(null);
		}
		// console.log(messages.curMessage);
		// console.log($routeParams);
		if (newPath != null) {
			$location.path('/messages/' + newPath, false);
		} else {
			$location.path('/messages', false);
		}
	};

	$scope.logOut = function() {
		auth.logOut();
		$location.path('/login');
	};

}]);

webresponseControllers.controller('MessageListCtrl', ['$scope', 'messages', function($scope, messages) {
	$scope.messages = messages.list;
	$scope.query = '';
	$scope.show = 'All';
	$scope.folder = 'inbox';

	$scope.$watch(function() {
		return (messages.ready);
	}, function(newVal, oldVal) {
		// console.log(newVal);
		if (newVal === true) {
			console.log("Perf, it's ready");
			$scope.loadMessages($scope.messagesPage);
		}
	});

	$scope.loadMessages = function(pg) {
		messages.loadMessages(pg).then(function(data) {
			$scope.$apply(function() {
				$scope.messages = data;
				// console.log(data);
			});
		}, function(error) {
			console.log(error);
		});
		console.log("Messages should be assigned.");
	};

	$scope.setMessagesUnread = function(unread) {
		var selectedMessages = $scope.getSelected();

		if (selectedMessages.length > 0) {
			selectedMessages.map(function(message) {
				message.status.unread = unread;
			});
		} else if (messages.getCurMessage() !== null) {
			messages.getCurMessage().status.unread = unread;
		} else {
			console.log("Nothing is selected.");
		}
	};

	$scope.getSelected = function() {
		return $scope.messages.filter(function(message) {
			return message.status.selected;
		});
	};

	$scope.clearSelected = function() {
		$scope.messages = $scope.messages.map(function(message, i) {
			message.status.selected = false;
			return message;
		});
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
				break;
		}
		return flag;
	};
}]);


webresponseControllers.controller('MessageViewCtrl', ['$scope', 'messages', function($scope, messages) {

	$scope.curMessage = messages.curMessage;

	$scope.$watch(function() {
		return ($scope.curMessage !== messages.curMessage);
	}, function(newMessage, oldMessage, scope) {
		$scope.curMessage = messages.curMessage;
	});

	$scope.moveMessageTo = function(message, dest) {
		message.folder = dest;
	};

	var createNewMessage = function() {
		// TODO:

	};

	$scope.reply = function() {
		curMessage = reply;
	};

	$scope.forward = function() {
		// TODO:
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

webresponseControllers.controller('LoginCtrl', ['$scope', '$http', '$location', 'auth', function($scope, $http, $location, auth) {
	$scope.loggedIn = false;
	$scope.errorMsg = null;
	$scope.username = "";
	$scope.pw = "";

	$scope.logIn = function() {
		console.log("Logging in...");
		auth.authenticate({
			"username": $scope.username,
			"password": $scope.pw,
		}).then(function(success) {
			$location.path('/messages', true);
		}, function(error) {
			$scope.errorMsg = error;
		});
	};

}]);
