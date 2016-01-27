'use strict';

var webresponseServices = angular.module('webresponseServices', []);

webresponseServices.factory('messages', ['$http', function($http) {
	var apiUrl = 'messages';
	var messages = {};

	messages.list = [];
	messages.curMessage = null;

	messages.loadMessages = function() {
		return $http.get(apiUrl + '/messages.json');
	};

	messages.setCurMessage = function(message) {
		messages.curMessage = message;
	};

	messages.getMessage = function(id) {
		var p = new Promise(function(resolve, reject) {
			// console.log(id);

			$http.get(apiUrl + '/messages.json').success(function(data) {
				var messages = data.filter(function(message, i) {
					return (message.id == id);
				});
				// console.log(messages);
				var message = (messages.length > 0) ? messages[0] : null;
				resolve(message);
			}).error(function(error) {
				reject(error);
			});
		});
		return (p);
	};

	messages.getCurMessage = function() {
		return messages.curMessage;
	};

	messages.moveTo = function(message, dest) {
		message.location = dest;
	};

	messages.loadMessages().success(function(data) {
		messages.list = data.data;
	});

	return messages;
}]);
