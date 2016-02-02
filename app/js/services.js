'use strict';

var webresponseServices = angular.module('webresponseServices', []);

webresponseServices.factory('messages', ['$http', function($http) {
	var apiUrl = 'messages';
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
