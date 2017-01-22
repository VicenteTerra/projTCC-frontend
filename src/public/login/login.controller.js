(function () {
  'use strict';
  angular.module('public')
  .controller('loginController', loginController);

  loginController.$inject = ['$location', 'authService'];
  function loginController($location , authService ) {
    var vm = this;
    vm.username = "";
    vm.password = "";

    vm.login = function () {

      if(authService.autentica(vm.username , vm.password)){
        vm.msg = "";

        if(vm.username === "adm")
        $location.path('/aluno');
        if(vm.username === "estab")
        $location.path('/estabelecimento');

      }
      else{
        vm.msg = "Usuário ou senha inválidos!"
      }
    }

    vm.logoff = function () {
      $location.path('/login');
    }


  }


})();
