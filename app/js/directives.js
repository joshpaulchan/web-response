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
            showfooter: '='
        },
        templateUrl: 'partials/card.html',
        link: function($scope, elem, attrs) {
            console.log($scope);
        }
    };
});
