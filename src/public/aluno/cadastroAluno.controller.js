(function () {
'use strict';
angular.module('public')
.controller('cadastroAlunoController',cadastroAlunoController);

cadastroAlunoController.$inject = ['alunoService'];
function cadastroAlunoController(alunoService) {
  var vm = this;
  vm.novoUsuario = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    status: ""
  }
  vm.salvarNovoUsuario = function () {
    console.log("new");
  //  console.log(AlunoService.getAll());
    alunoService.criar(vm.novoUsuario);
  }
}
})();
