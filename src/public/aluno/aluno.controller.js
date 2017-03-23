(function () {
'use strict'
  angular.module('public')
  .controller('alunoController' , alunoController);

  alunoController.$inject = ['alunoService' , 'authService' , '$scope' , '$mdSidenav'];
  function alunoController(alunoService , authService , $scope , $mdSidenav) {
    var vm = this;
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }

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
