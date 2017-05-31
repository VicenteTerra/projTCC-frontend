(function() {
	'use strict';

	angular.module('myApp', ['public'])
	.config(config)
    .run(auth)

    config.$inject = ['$urlRouterProvider', '$mdThemingProvider'];

    function config($urlRouterProvider , $mdThemingProvider) {
        // If user goes to a path that doesn't exist, redirect to public root
        $urlRouterProvider.otherwise('/login');

        $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('teal', { 'default' : '300'});

    }

    auth.$inject = ['$rootScope' , '$location' , 'authService'];
    function auth($rootScope, $location , authService){
        $rootScope.$on("$routeChangeSuccess", function(userInfo) {
            console.log(userInfo);
        });

        $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
            if (eventObj.authenticated === false) {
              $location.path("/login");
          }
      });
        authService.init();
}
})();