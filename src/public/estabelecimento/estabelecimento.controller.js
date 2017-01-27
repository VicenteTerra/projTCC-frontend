(function () {
  'use strict'
  angular.module('public')
  .controller('estabelecimentoController',estabelecimentoController);

  estabelecimentoController.$inject = ['alunoService' ];
  function estabelecimentoController(alunoService) {
    var vm = this;
    vm.consultaCpf = "";
    vm.usuarioConsulta = {};
    vm.showImg = false;


    vm.consultar = function () {
    alunoService.getAlunoByCpf(vm.consultaCpf).then(function (response) {
      vm.usuarioConsulta = response;
      vm.showImg = true;
    });
    }



  }
})();
