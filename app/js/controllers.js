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
		var replyContent = $scope.replyForm.content //.replace() list for parsing html:
									.replace(/<br>/g,"\r\n") //Replace html <br> with \r\n
									.replace(/<([^>]*)>/g, ""); //Remove all remaining html tags (i.e. anything between < and >)

		sendMsg({
			"email": "you",
			"content": replyContent,
			"createdAt": new Date().toString()
		});
		$scope.replyForm.content = "";
	};

	 $scope.emailRegEx = /(([-\w!#$%&'*+\/=?^_`{|}~]|\"([^\"\n\r\\]|\\[^-\w!#$%&'*+\/=?^_`{|}~])*\"|\\[^-\w!#$%&'*+\/=?^_`{|}~])(\.)?)+\@[-_\w]+(\.[-_\w]+)+/g;
	 //DOCUMENTATION FOR REGEX:
	 //This regular expression captures any string which matches the RFC822 standards for legal email adresses. You can find this document at
	 //https://www.w3.org/Protocols/rfc822/.
	 //
	 //This regular expression contains several parts. There are two major sections: the first checks the adress portion (the part before the @)
	 //and the second checks the domain portion (the part following the @). Because domains are fairly simple, they are checked with the REGEX:
	 //
	 //		\@[-_\w]+(\.[-_\w]+)+
	 //
	 //This captures strings preceded by an @, followed by sequence of at least one character which is either a letter (A-Z, lowercase or uppercase)
	 //a number, a - (hyphen), or a _ (understcore), followed by a . (dot/period) followed by a another similar sequence of characters.
	 //Hence the use of the character class [-_\w], where \w is any "word character", i.e. A-Z, a-z, 0-9.
	 //Basically, this checks for something of the form
	 //
	 //		...@domain.subdomain.subsubdomain.extension
	 //
	 //Where domain is something like "mail", .subdomain and .subsubdomain (and any further .subdomains) are optional and something like (google), and .extension is
	 //something like "com" or "net".
	 //
	 //The adress portion of the email adress is checked by the first part of the REGEX:
	 //
	 // 	(([-\w!#$%&'*+\/=?^_`{|}~]|\"([^\"\n\r\\]|\\[^-\w!#$%&'*+\/=?^_`{|}~])*\"|\\[^-\w!#$%&'*+\/=?^_`{|}~])(\.)?)+
	 //
	 //This really is just a compound class with 3 alternative groups (that is to say, a string matching any one of them passes. The +
	 //quantifier means that the adress will be made of at least one sequence matching these.
	 //
	 //*********************************************************************************************************************
	 //The first alternative is:
	 //
	 //		[-\w!#$%&'*+\/=?^_`{|}~]
	 //
	 //This tests for a character which is either a word character, or in the following set of characters:
	 //
	 //		-!#$%&'*+/=?^_`{|}~
	 //
	 //Notably excluded are @ (for obvious reasons), normal parentheses (), and double quotation marks ".
	 //This alternative covers cases such as:
	 //
	 //		johndoe@example.com
	 //		auto-repair@example.com
	 //		&#$%_you!@example.com
	 //
	 //*********************************************************************************************************************
	 //The second alternative is:
	 //
	 //		\"([^\"\n\r\\]|\\[^-\w!#$%&'*+\/=?^_`{|}~])*\"
	 //
	 //This matches adresses which are contained between quotation marks.
	 //While not common (and forbidden by a majority of email sites), it is technically legal for  adresses to contain sequences between
	 //quotation marks, so long as they are closed (i.e. there is an even number of quote marks). Parts within quotation marks are
	 //far more diverse in terms of the allowed characters, with only new-line characters (\r and \n) and backslash \ being forbidden.
	 //For example:
	 //
	 //		"Fish<><"@example.com
	 //		"...abc..."@example.com
	 //		"b@man"@example.com
	 //
	 //However, even these characters are considered legal if preceded by a \ character. This is called "escaping" the illegal character.
	 //So long as one doesn't try to escape a normally legal character (i.e. any already permitted by the first alternative), many
	 //strange adresses are allowed, such as:
	 //
	 //		"#slinging\\er"@example.com
	 //		"qwert\"asdf"@example.com
	 //		"Hello\
	 //		world"@example.com
	 //
	 //The first example escapes the \ character, allowing it to be included. The second example escapes the " character
	 //(confusing, I know).The third example escapes the newline character, allowing it to span multiple lines.
	 //
	 //Of course you would be hard-pressed to find a site allowing you to sign up for these kinds of adresses, and even more foolish
	 //to do so, since few sites would consider them valid, but they are allowed by the standard and so included here.
	 //
	 //*********************************************************************************************************************
	 //The third and final alternative is:
	 //
	 //		\\[^-\w!#$%&'*+\/=?^_`{|}~])
	 //
	 //This is identical to the second part of the second alternative as shown above. Simply put, this means you are allowed to
	 //Escape characters outside of quoation marks as well, making the following still valid:
	 //
	 //		b\@man@example.com
	 //		\(Happy_Face\)@example.com
	 //		\"""Wallo@example.com
	 //
	 //*********************************************************************************************************************
	 //Lastly, in the adress portion of the REGEX is the following sequence:
	 //
	 //		(\.)?
	 //
	 //following the 3 alternatives. This Allows any of the above accepted sequences to be followed by a . character (dot).
	 //However, because of the ? quantifier, only a single un-escaped dot may appear in sequence, so the following is legal:
	 //
	 //		a.e.windsor@example.com
	 //
	 //But the following is NOT legal:
	 //
	 //		a.e..windsor@example.com //NOT LEGAL
	 //
	 //*********************************************************************************************************************
	 //In summary, any adress containing words, numbers, common symbols, strings between quotation marks, and special
	 //characters escaped by \s is legal.
	 //
	 //For the most part, this reglar expression is highly lenient, so some illegal adresses may pass. However, it
	 //rarely makes any false negatives. The only known issue is that it forbids the domain portion from containing
	 //accented characters such as á, é, ñ, etc, despite them being technically legal. For example:
	 //
	 // joe@resumé.com
	 //
	 //Is technically legal, but not captured by this REGEX. These domains, however, are exceedingly uncommon in general,
	 //let alone for emails, so this bug is left in for now.
	 //
	 //If you find any other bugs or flaws in this REGEX you may send a message to dfshepsis@gmail.com to request support.
	$scope.$watch(function() {
		return ($scope.replyForm.targetStr);
	}, function(newTarget, oldTarget) {
		$scope.replyForm.targetStr = $scope.replyForm.targetStr.replace(/<[^>]*>/g, "");
	});

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
