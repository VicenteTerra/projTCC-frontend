(function () {
  'use strict';
  angular.module('public')
    .controller('loginController', loginController);

  loginController.$inject = ['$location', 'authService'];
  function loginController($location, authService) {
    var vm = this;
    vm.email = "";
    vm.password = "";

    vm.login = function () {

      authService.autentica(vm.email, vm.senha).then(function (response) {
        console.log(response);
        if (response.status == 0) {
        vm.msg = "";
        $location.path('/aluno');
      }
      else {
        vm.msg = "Usuário ou senha inválidos!"
      }
      });   
    }

    vm.logoff = function () {
      $location.path('/login');
    }
  }


})();
