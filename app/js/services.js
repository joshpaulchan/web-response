/* global document, window, console, Promise */
'use strict';

var webresponseServices = angular.module('webresponseServices', []);

webresponseServices.factory('messages', ['$http', function($http) {
	var apiUrl = 'data';
	var phpUrl = 'php';
	var callUrl = 'Calls';
	var queryUrl = 'queries';
	var messages = {};

	messages.curMessage = null;

	(function loadInitial() {
		console.log("Load Initial...");
		$http.get(apiUrl + '/messages.json').success(function(data) {
			console.log(data);

			messages.list = data;
			messages.ready = true;
		}).error(function(error) {
			console.log(error);
		});
	})();


    // TODO: Check that messages returned are listed on page properly
	// $http.get(phpUrl + '/' + callUrl + '/GetAllMessages.php')
	//     .then(function(data){
	// 		console.log(data);
	//         messages.list = data;
	//         messages.ready = true;
    // 	}, function(error){
    // 	    console.log(error);
    // 	}
    // );

	// TODO: replace with call
	messages.loadMessages = function(pg) {
		var p = new Promise(function(resolve, reject) {
			resolve(messages.list);
		});
		return p;
	};

	messages.getMessage = function(id) {
		var p = new Promise(function(resolve, reject) {
			// console.log(id);

			$http.get(phpUrl + '/' + callUrl + '/GetMessage.php', {
				'messageId': id
			}).then(function(data){
					console.log(data);
			        resolve(data.data);
		    	}, function(error){
		    	    reject(error);
		    	}
		    );
		});
		return p;
	};

	messages.sendMessage = function(email_to, email_from, email_cc, email_body) {
		var p = new Promise(function(resolve, reject) {
			$http.post(phpUrl + '/' + callUrl + '/sendMessage.php', {
				'email_to': email_to,
				'email_from': email_from,
				'email_cc': email_cc,
				'email_body': email_body
			}).then(function(data) {
				console.log(data);
				resolve(data);
			}, function(error) {
				console.log(error);
			});
		});
		return p;
	};

	messages.setCurMessage = function(message) {
		if (messages.curMessage !== null) {
			messages.curMessage.status.open = false;
		}
		messages.curMessage = message;
		if (!!message) {
			message.status.open = true;
		}
		return message;
	};

	messages.getCurMessage = function() {
		return messages.curMessage;
	};

	messages.isReady = function() {
		return (!!messages.ready === true);
	};

	return messages;
}]);

webresponseServices.factory('auth', ['$http', function($http) {
	var apiUrl = 'data';
	var auth = {};

	auth.users = [];
	auth.user = null;
	auth.ready = false;

	$http.get(apiUrl + '/users.json').success(function(data) {
		// console.log(data);
		auth.users = data;
		auth.ready = true;
	}).error(function(error) {
		console.log(error);
	});

	auth.findByUsername = function(username) {
		var user = auth.users.filter(function(user) {
			return (user.username === username);
		});

		if (user.length > 0) {
			return user[0];
		} else {
			return null;
		}
	};

	auth.authenticate = function(data) {
		var p = new Promise(function(resolve, reject) {
			var username = data.username;
			var pw = data.password;

			var user = auth.findByUsername(username);

			if (user === null) {
				reject("Username does not exist.");
			} else if (user.password !== pw) {
				reject("Incorrect password.");
			} else {
				auth.user = user;
				var session = Math.floor(Math.random() * 100).toString();

				window.sessionStorage.setItem("WR-session-id", session);

				resolve({
					'user': username,
					'session': session
				});
			}
		});

		return p;
	};

	auth.isLoggedIn = function(session) {
		// FIXME: Implement actual sessions pls
		if (window.sessionStorage.getItem("WR-session-id")) {
			return true;
		}
		return ((auth.user) ? auth.user : false);
	};

	auth.logOut = function() {
		auth.user = null;
		window.sessionStorage.removeItem("WR-session-id");
		return false;
	};

	return auth;
}]);

webresponseServices.factory('UserService', ['$http', function($http) {
	var apiUrl = 'data';
	var users = {};

	users.list = [];

	$http.get(apiUrl + '/users.json').success(function(data) {
		// console.log(data);
		users.list = data;
		users.ready = true;
	}).error(function(error) {
		console.log(error);
	});

	var editDistance = function(s, t) {
		if (s.length === 0) {
			return t.length;
		}
		if (t.length === 0) {
			return s.length;
		}

		var cost = 0;
		if (s[s.length - 1].toLowerCase() !== s[s.length - 1].toLowerCase()) {
			cost = 1;
		}

		return Math.min(
			editDistance(s.slice(0, -1), t) + 1,
			editDistance(s, t.slice(0, -1)) + 1,
			editDistance(s.slice(0, -1), t.slice(0, -1)) + cost);
	};

	users.fuzzyFindByUsername = function(cand) {
		var p = new Promise(function(resolve, reject) {
			var ed = 0;
			var eps = 3;
			var suggestions = [];
			users.list.map(function(user) {
				ed = editDistance(user.username, cand);
				if (ed <= eps) {
					suggestions.push({
						'score': ed,
						'username': user.username,
						'id': user.id
					});
				}
			});

			resolve(suggestions);
		});
		return p;
	};

	users.findByUsername = function(username) {
		var p = new Promise(function(resolve, reject) {
			var suggestions = users.list.filter(function(user) {
				return (user.username === username);
			});
			if (suggestions.length > 0) {
				resolve({
					'score': 0,
					'username': suggestions[0].username,
					'id': suggestions[0].id
				});
			} else {
				reject("User with username: '" + username + "' could not be found.");
			}
		});

		return p;
	};

	users.findByEmail = function(email) {
		var p = new Promise(function(resolve, reject) {
			var suggestions = users.list.filter(function(user) {
				return (user.email === email);
			});
			if (suggestions.length > 0) {
				resolve({
					'score': 0,
					'username': suggestions[0].username,
					'id': suggestions[0].id
				});
			} else {
				reject("User with email: '" + email + "' could not be found.");
			}
		});

		return p;
	};

	users.queryByUsername = function(username) {
		var p = new Promise(function(resolve, reject) {
			var suggestions = [];
			users.list.map(function(user) {
				if (user.username.startsWith(username)) {
					suggestions.push({
						'score': 0,
						'username': user.username,
						'user': user
					});
				}
			});

			resolve(suggestions);
		});

		return p;
	};

	return users;
}]);
