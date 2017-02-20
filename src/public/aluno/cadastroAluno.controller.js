(function () {
'use strict';
angular.module('public')
.controller('cadastroAlunoController',cadastroAlunoController);

cadastroAlunoController.$inject = ['alunoService', '$location'];
function cadastroAlunoController(alunoService, $location) {
  var vm = this;
  vm.novoUsuario = {};
  vm.instituicaoList = [{nome : "UFLA"},{nome : "UNILAVRAS"},{nome : "FAGAMOM"}];

  vm.salvarNovoUsuario = function () {
    alunoService.criarAluno(vm.novoUsuario).then(function () {
        $location.path('/login');
    });
  }


}

})();
