/* global angular, document, window, console, Promise */
'use strict';

var webresponseDirectives = angular.module('webresponseDirectives', []);

webresponseDirectives.directive('contenteditable', function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(scope, elem, attrs, ngModel) {
            if (!ngModel) {return;}

            var read = function() {
                ngModel.$setViewValue(elem.html());
            };

            ngModel.$render = function() {
                elem.html(ngModel.$viewValue || "");
            };

            elem.bind("blur keyup change", function() {
                scope.$apply(read);
            });
        }
    };
});

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
            'label': '@',
            'ngModel': '='
        },
        template: "<div class='card-header card-header-input'><label>{{label}}</label><div contenteditable ng-model='ngModel'></div></div>",
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
        scope: {
            'ngModel': '='
        },
        template: "<div class='card-body card-body-input' contenteditable ng-model='ngModel'></div>",
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
