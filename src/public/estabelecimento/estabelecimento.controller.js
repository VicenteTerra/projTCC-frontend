(function () {
  'use strict'
  angular.module('public')
  .controller('estabelecimentoController',estabelecimentoController);

  estabelecimentoController.$inject = ['alunoService' ,'$scope', '$mdSidenav'];
  function estabelecimentoController(alunoService, $scope , $mdSidenav) {
    var vm = this;
    vm.consultaCpf = "";
    vm.usuarioConsulta = {};
    vm.showResultConsulta = false;
    vm.toggle = true;

    vm.consultar = function () {
      alunoService.getAlunoByCpf(vm.consultaCpf).then(function (response) {
        if(response.status == 0){
          vm.usuarioConsulta = response.alunoConsulta;
          vm.showResultConsulta = true;
        }else{
          var notify = {
            type: 'error',
            title: response.message,
            content: '',
            timeout: 5000 
          };
          $scope.$emit('notify', notify);
        }
      });
    }
    vm.limparConsulta = function(){
      vm.showResultConsulta = false;
      vm.consultaCpf = "";
    }

    vm.toggleSideNav = function(){
      vm.toggle = !vm.toggle;
    }



  }
})();
