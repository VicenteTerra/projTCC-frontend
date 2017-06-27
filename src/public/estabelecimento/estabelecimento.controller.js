(function () {
  'use strict'
  angular.module('public')
  .controller('estabelecimentoController',estabelecimentoController);

  estabelecimentoController.$inject = ['alunoService' ,'$scope', '$mdSidenav' , '$location', 'authService', 
  '$window' , '$base64' ];
  function estabelecimentoController(alunoService, $scope , $mdSidenav, $location , authService , $window , $base64) {
    var vm = this;
    vm.consultaMat = "";
    vm.usuarioConsulta = {};
    vm.showResultConsulta = false;
    vm.toggle = true;
    vm.usuarioLogado = authService.getUserInfo().userName.split(' ')[0];

    vm.consultar = function () {
      alunoService.getAlunoByCpf(vm.consultaMat).then(function (response) {
        if(response.status == 0){
          vm.usuarioConsulta = response.alunoConsulta;
          //console.log(vm.usuarioConsulta);
          vm.showResultConsulta = true;
        }else{
          vm.usuarioConsulta = null;
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
      vm.consultaMat = "";
    }

    vm.toggleSideNav = function(){
      vm.toggle = !vm.toggle;
    }

    vm.logout = function(){
      authService.logout();
      $location.path("/login");
    }

  }
})();
