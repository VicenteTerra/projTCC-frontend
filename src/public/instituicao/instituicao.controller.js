(function () {
	'use strict'
	angular.module('public')
	.controller('instituicaoController',instituicaoController);

	instituicaoController.$inject = ['authService' ];
	function instituicaoController(autService) {
		var vm = this;
		vm.usuarioLogado = authService.getUserInfo().userName.split(' ')[0];

		vm.logout = function(){
			authService.logout();
			$location.path("/login");
		}
	}
})();
