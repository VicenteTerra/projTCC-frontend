(function () {
  'use strict';
  angular.module('public')
  .controller('loginController', loginController);

  loginController.$inject = ['$location', 'authService', '$scope'];
  function loginController($location, authService, $scope) {
    var vm = this;
    vm.email = "";
    vm.password = "";

    vm.login = function () {

      authService.autentica(vm.email, vm.senha).then(function (response) {

        if (response.status === 0) {
          if(response.tipoUsuario === 0){
           $location.path('/instituicao');
         }

         if(response.tipoUsuario === 1){
          $location.path('/estabelecimento');
        }
        if (response.tipoUsuario === 2) {
          $location.path('/aluno');
        }

      }
      else {
        var notify = {
          type: 'error',
          title: 'Usuário ou senha inválidos!',
          content: 'Verifique se o usuário e senha conferem e se você está cadastrado no sistema.',
            timeout: 5000 //time in ms
          };
          $scope.$emit('notify', notify);
        }
      });
    }

    vm.logoff = function () {
      $location.path('/login');
    }
  }


})();
