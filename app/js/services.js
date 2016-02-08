'use strict';

var webresponseServices = angular.module('webresponseServices', []);

webresponseServices.factory('messages', ['$http', function($http) {
	var apiUrl = 'data';
	var messages = {};

	messages.list = [];
	messages.curMessage = null;
	messages.ready = false;

	$http.get(apiUrl + '/messages.json').success(function(data) {
		console.log(data);
		messages.list = data;
		messages.ready = true;
	}).error(function(error) {
		console.log(error);
	});

	messages.loadMessages = function(pg) {
		var p = new Promise(function(resolve, reject) {
			resolve(messages.list);
		});
		return p;
	};

	messages.getMessage = function(id) {
		var p = new Promise(function(resolve, reject) {
			// console.log(id);

			var messages = messages.list.filter(function(message, i) {
				return (message.id == id);
			});
			// console.log(messages);
			var message = (messages.length > 0) ? messages[0] : null;
			if (message != null) {
				resolve(message);
			} else {
				reject(Error("Message with id:" + id + "does not exist."));
			}
		});
		return p;
	};

	messages.setCurMessage = function(message) {
		messages.curMessage = message;
	};

	messages.getCurMessage = function() {
		return messages.curMessage;
	};

	messages.ready = function() {
		return (messages.ready === true);
	};

	return messages;
}]);

webresponseServices.factory('users', ['$http', function($http) {
	var apiUrl = 'data';
	var users = {};

	users.list = [];
	users.sessions = [];
	users.ready = false;

	$http.get(apiUrl + '/users.json').success(function(data) {
		console.log(data);
		users.list = data;
		users.ready = true;
	}).error(function(error) {
		console.log(error);
	});

	users.findUserByUsername = function(username) {
		var user = users.list.filter(function(user) {
			return (user.username == username);
		});

		if (user.length === 0) {
			return null;
		} else {
			return user[0];
		}
	};

	users.authenticate = function(data) {
		var p = new Promise(function(resolve, reject) {
			var username = data.username;
			var pw = data.password;

			var user = users.findUserByUsername(username);

			if (user === null) {
				reject("Username does not exist.");
			} else if (user.password !== pw) {
				reject("Incorrect password.");
			} else {
				resolve({
					'user': username,
					'session': (Math.random() * 16).toString()
				});
			}
		});

		return p;
	};

	users.isLoggedIn = function(session) {
		var res = users.sessions.filter(function(userSession) {
			return (userSession == session);
		});

		if (res.length > 0) {
			return true;
		} else {
			return false;
		}
	};

	return users;
}]);
