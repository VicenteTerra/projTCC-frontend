(function () {
'use strict'
  angular.module('public')
  .controller('alunoController' , alunoController);

  alunoController.$inject = ['alunoService'];
  function alunoController(alunoService) {
    var vm = this;
    vm.alunologado = "Admin";
    vm.list = alunoService.getAll();


    vm.salvarNovoUsuario = function () {
      console.log("new");
      alunoService.criar();
    }
  }
})();
