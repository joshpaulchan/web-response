var webresponseApp = angular.module('webresponseApp', [
'ngRoute',
'webresponseControllers',
'webresponseServices'
]);

webresponseApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/messages', {
			templateUrl: 'partials/messages.html'
		}).
		when('/messages/:messageId', {
			templateUrl: 'partials/messages.html',
			controller: 'MessageCtrl'
		}).
		when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'LoginCtrl'
		}).
		otherwise({
			redirectTo: '/login'
		});
}]);
