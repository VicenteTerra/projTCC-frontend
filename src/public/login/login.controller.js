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

      authService.login(vm.email, vm.senha).then(function (response) {
        if (response.status === 0) {
          if(response.userType === 0){
           $location.path('/instituicao');
         }
         if(response.userType ===  1){
          $location.path('/estabelecimento');
        }
        if (response.userType ===  2) {
          $location.path('/aluno');
        }
      }
      else {
        var notify = {
          type: 'error',
          title: 'Ops... Algo deu errado!',
          content: response.message,
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
