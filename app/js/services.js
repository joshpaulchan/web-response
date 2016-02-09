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
				var session = (Math.random() * 16).toString();

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
