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

	$scope.showOptionsModal = function() {
		// Show the options modal;
		$scope.showOptions = true;
	};

	$scope.hideOptionsModal = function() {
		// Hide the options modal;
		$scope.showOptions = false;
	};
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

	$scope.disableDropdown = function() {
		var selectedMessages = $scope.getSelected();
		var curMessage = messages.getCurMessage();
		if (selectedMessages == 0 && curMessage == null) {
			return true;
		} else {
			return false;
		}
	}

	////////////////////////////////
	// MESSAGE LIST-ITEM CONTROLS //
	////////////////////////////////

	$scope.getSelected = function() {
		return $scope.messages.filter(function(message) {
			return (message.status.selected);
		});
	};

	$scope.curMessage = messages.curMessage;
	$scope.forwardPressed = false;

	$scope.$watch(function() {
		return ($scope.curMessage !== messages.curMessage);
	}, function(newMessage, oldMessage, scope) {
		$scope.curMessage = messages.curMessage;
		$scope.forwardPressed = false;
	});
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
	$scope.replyForm = {
		"content" : "We have lift-off.",
		"targetStr" : "",
		"targets" : [],
		"targetSuggestions" : [],
		"templates" : []
	};

	$scope.$watch(function() {
		return ($scope.curMessage !== messages.getCurMessage());
	}, function(newMessage, oldMessage) {
		$scope.curMessage = messages.getCurMessage();
	});

	var sendMsg = function(msg) {
		// 1. send to server
		$scope.curMessage.thread.push(msg);
		return msg;
	};

	$scope.reply = function() {
		var replyContent = $scope.replyForm.content
									.replace(/<br>/g,"\r\n")
									.replace(/<([^>]*)>/g, "");

		sendMsg({
			"email": "you",
			"content": replyContent,
			"createdAt": new Date().toString()
		});
		$scope.replyForm.content = "";
	};

	$scope.forward = function(msgData) {
		var sendTo = msgData.email;
		var content = msgData.content;

		// Format forwarded content
		content = content.split('\n').map(function(line, i) {
			return "".concat(">>> ", line);
		}).join('\n');
		content = "\n\n" + content;

		// Insert into DOM
		$scope.replyForm.content = content;
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

webresponseControllers.controller('OptionsCtrl', function($scope) {
	$scope.panel = 1;

	$scope.selectPanel = function(setPanel) {
		$scope.panel = setPanel;
	};

	$scope.isSelected = function(checkPanel) {
		return $scope.panel === checkPanel;
	};

	$scope.getPanel = function() {
		return $scope.panel;
	};

	// Figuring out if possible to use ngRepeat for options
	// $scope.optionItems = [
	// 	{
	// 		imgSrc: 'http://www.animalfactguide.com/wp-content/uploads/2013/01/koala3.jpg',
	// 		panelNum: 1
	// 	},
	// 	{
	// 		imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Koala_climbing_tree.jpg',
	// 		panelNum: 2
	// 	},
	// 	{
	// 		imgSrc: 'http://animals.sandiegozoo.org/sites/default/files/juicebox_slides/koala_ecalypt.jpg',
	// 		panelNum: 3
	// 	},
	// 	{
	// 		imgSrc: 'https://c2.staticflickr.com/6/5514/11051555136_7c0e9560f5_b.jpg',
	// 		panelNum: 4
	// 	}
	// ];
});
