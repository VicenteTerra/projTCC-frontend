(function () {
  'use strict'
  angular.module('public')
  .controller('estabelecimentoController',estabelecimentoController);

  estabelecimentoController.$inject = ['alunoService' ];
  function estabelecimentoController(alunoService) {
    var vm = this;
    vm.consulta = "";
    vm.result = "";


    vm.consultar = function () {
      vm.aluno = alunoService.getAlunoByName(vm.consulta);
      console.log(vm.aluno.status);
      vm.result = vm.aluno.status;
    }



  }
})();
