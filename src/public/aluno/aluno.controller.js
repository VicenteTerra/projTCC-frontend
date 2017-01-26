(function () {
'use strict'
  angular.module('public')
  .controller('alunoController' , alunoController);

  alunoController.$inject = ['alunoService'];
  function alunoController(alunoService) {
    var vm = this;
    vm.alunologado = "Admin";

    //console.log(alunoService.getAll());

    

    vm.loadAlunos = function () {
     alunoService.getAll().then(function (response) {
       vm.list = response;
     });
    }

    vm.removeAluno = function (index) {
      alunoService.removeAluno(index).then(function () {
        vm.loadAlunos();
      });
    }



  }
})();
