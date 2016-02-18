/* global angular, document, window, console, Promise */
'use strict';

var webresponseDirectives = angular.module('webresponseDirectives', []);

webresponseDirectives.directive('convoCard', function() {
    return {
        restrict: 'E',
        transclude: true,
        template: "<div class='card convo-card card-shadow' ng-transclude></div>",
        link: function($scope, elem, attrs) {}
    };
});

webresponseDirectives.directive('cardHeader', function() {
    return {
        restrict: 'E',
        transclude: true,
        template: "<div class='card-header' ng-transclude></div>",
        link: function($scope, elem, attrs) {}
    };
});

webresponseDirectives.directive('cardBody', function() {
    return {
        restrict: 'E',
        transclude: true,
        template: "<div class='card-body' ng-transclude></div>",
        link: function($scope, elem, attrs) {}
    };
});

webresponseDirectives.directive('cardFooter', function() {
    return {
        restrict: 'E',
        transclude: true,
        template: "<div class='card-footer' ng-transclude></div>",
        link: function($scope, elem, attrs) {}
    };
});
