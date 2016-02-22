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

webresponseDirectives.directive('cardHeaderInput', function() {
    return {
        restrict: 'E',
        scope: {
            'label': '@'
        },
        template: "<div class='card-header card-header-input'><label>{{label}}</label><div contenteditable='true'></div></div>",
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

webresponseDirectives.directive('cardBodyInput', function() {
    return {
        restrict: 'E',
        template: "<div class='card-body card-body-input' contenteditable='true'></div>",
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
