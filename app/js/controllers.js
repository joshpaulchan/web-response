/*global angular, document, console*/
'use strict';

/* CONTROLLERS */

var webresponseControllers = angular.module('webresponseControllers', []);

webresponseControllers.controller('MessageCtrl', function($scope, $routeParams, messages) {
	$scope.messageId = $routeParams.messageId;
	$scope.messagesPage = 0;

	$scope.$watch(messages.isReady, function() {
		if (messages.isReady()) {
			messages.getMessage($scope.messageId).then(messages.setCurMessage, function(error) {
				console.log(error);
			});
		}
	});
});

webresponseControllers.controller('MessageNavBarCtrl', function($scope, $location, auth) {
	$scope.logOut = function() {
		auth.logOut();
		$location.path('/login', true);
	};
});

webresponseControllers.controller('MessageListCtrl', function($scope, $location, messages) {
	$scope.messages = [];
	$scope.query = "";
	$scope.show = 'All';
	$scope.folder = 'inbox';

	$scope.$watch(messages.isReady, function(n, o) {
		if (messages.isReady()) {
			$scope.loadMessages($scope.messagesPage);
		}
	});

	$scope.loadMessages = function(pg) {
		messages.loadMessages(pg).then(function(data) {
			$scope.$apply(function() {
				$scope.messages = data;
			});
		}, function(error) {
			console.log(error);
		});
	};

	///////////////////////////
	// MESSAGE LIST CONTROLS //
	///////////////////////////

	$scope.setMessagesUnread = function(unread) {
		var selectedMessages = $scope.getSelected();

		if (selectedMessages.length > 0) {
			selectedMessages.map(function(message) {
				message.status.unread = unread;
			});
		} else if (messages.getCurMessage() !== null) {
			messages.getCurMessage().status.unread = unread;
		}
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

	////////////////////////////////
	// MESSAGE LIST-ITEM CONTROLS //
	////////////////////////////////

	$scope.getSelected = function() {
		return $scope.messages.filter(function(message) {
			return (message.status.selected);
		});
	};

	$scope.clearSelected = function() {
		$scope.messages = $scope.messages.map(function(message, i) {
			message.status.selected = false;
			return (message);
		});
	};

	$scope.viewMessage = function(message) {
		// 1. set is as new message
		if (messages.getCurMessage() !== message) {
			messages.setCurMessage(message);
		} else {
			messages.setCurMessage(null);
		}

		// 2. change path
		var pathId = (!!messages.getCurMessage()) ? ('/' +  message.id) : '';
		var newPath = '/messages' + pathId;
		$location.path(newPath, false);
	};
});


webresponseControllers.controller('MessageViewCtrl', function($scope, $compile, messages) {

	$scope.$watch(function() {
		return ($scope.curMessage !== messages.getCurMessage());
	}, function(newMessage, oldMessage) {
		$scope.curMessage = messages.getCurMessage();
	});

	var createNewMessage = function(name, date, body) {
		var msgCard = $compile(
			'<convo-card title="' + name +
			'" note="' + date +
			'" body="' + body +
			'" showfooter=true reply="reply" forward="forward"></convo-card>')($scope);
		console.log(msgCard);
		return msgCard;
	};

	$scope.reply = function() {
		var msgCard = createNewMessage('me', new Date().toString(), 'hello, it\'s me');
		var msgList = document.querySelector('#main').querySelector('.list');

		// Insert into DOM
		angular.element(msgList).append(msgCard);
	};

	$scope.forward = function() {
		var msgCard = createNewMessage();
		var msgList = document.querySelector('#main').querySelector('.list');

		// Insert into DOM
		msgList.append(msgCard.html());
	};

});

webresponseControllers.controller('LoginCtrl', function($scope, $location, auth) {
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
});
