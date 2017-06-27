(function () {
  'use strict'
  angular.module('public')
  .controller('alunoController' , alunoController);

  alunoController.$inject = ['alunoService' , 'authService' , '$scope' , '$mdSidenav' ,'$location'];
  function alunoController(alunoService , authService , $scope , $mdSidenav , $location) {
    var vm = this;
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    vm.usuarioLogado = authService.getUserInfo().userName.split(' ')[0];


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

  vm.logout = function(){
    authService.logout();
    $location.path("/login");
  }

}
})();
