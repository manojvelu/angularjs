var busHandle = angular.module('busHandle', ["ngRoute"]);
busHandle.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "/assets/view/main.html"
    });
});