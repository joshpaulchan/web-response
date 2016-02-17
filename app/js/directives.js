/* global angular, document, window, console, Promise */
'use strict';

var webresponseDirectives = angular.module('webresponseDirectives', []);

webresponseDirectives.directive('convoCard', function() {
    return {
        restrict: 'E',
        scope: {
            title: '@',
            note: '@',
            body: '@',
            showfooter: '=',
            reply: '=',
            forward: '='
        },
        templateUrl: 'partials/card.html',
        link: function($scope, elem, attrs) {}
    };
});
