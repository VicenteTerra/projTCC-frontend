(function() {
	'use strict';

	angular.module('myApp', ['public'])
	.config(config);

	config.$inject = ['$urlRouterProvider', '$mdThemingProvider'];

	function config($urlRouterProvider , $mdThemingProvider) {
        // If user goes to a path that doesn't exist, redirect to public root
        $urlRouterProvider.otherwise('/login');

        $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('teal', { 'default' : '300'});
    }
})();