/* global angular, document, window, console, Promise */
'use strict';

var webresponseDirectives = angular.module('webresponseDirectives', []);

webresponseDirectives.directive('convoCard', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/card.html',
        link: function($scope, element, attrs) {}
    };
});
