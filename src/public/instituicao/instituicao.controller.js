(function () {
	'use strict'
	angular.module('public')
	.controller('instituicaoController',instituicaoController);

	instituicaoController.$inject = ['authService' ];
	function instituicaoController(authService) {
		var vm = this;

		vm.logout = function(){
			authService.logout();
			$location.path("/login");
		}
	}
})();
