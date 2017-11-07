(function() {
    'use strict'
    angular.module('public')
        .controller('estabelecimentoController', estabelecimentoController);

    estabelecimentoController.$inject = ['alunoService', '$scope', '$mdSidenav', '$location', 'authService',
        '$window', '$base64', 'estabelecimentoService', '$mdToast'
    ];

    function estabelecimentoController(alunoService, $scope, $mdSidenav, $location, authService, $window, $base64, estabelecimentoService, $mdToast) {
        var vm = this;
        vm.consultaMat = "";
        vm.usuarioConsulta = {};
        vm.showResultConsulta = false;
        vm.toggle = true;
        vm.usuarioLogado = authService.getUserInfo().userName.split(' ')[0];
        vm.userid = authService.getUserInfo().userId;
        vm.listaAutorizacoes = [];
        vm.showMsg = [];
        vm.estabelecimento = {};


        vm.getEstabelecimento = function() {
            estabelecimentoService.getEstabelecimento(vm.userid).then(function(response) {
                if (response.status == 0) {
                    vm.estabelecimento = response.estabelecimento;
                } else {

                }
            })
        }
        vm.getEstabelecimento();

        vm.updateEstabelecimento = function() {
            estabelecimentoService.updateEstabelecimento(vm.estabelecimento).then(function(response) {
                if(response.status == 0){
                    var notify = {
                        type: 'success',
                        title: response.message,
                        content: '',
                        timeout: 4000
                    };
                    $scope.$emit('notify', notify);
                }
            })
        }
        vm.consultar = function() {
            alunoService.getAlunoByCpf(vm.consultaMat, vm.userid).then(function(response) {
                if (response.status == 0) {
                    vm.usuarioConsulta = response.alunoConsulta;
                    //console.log(vm.usuarioConsulta);
                    vm.showResultConsulta = true;
                } else {
                    vm.usuarioConsulta = null;
                    var notify = {
                        type: 'error',
                        title: response.message,
                        content: '',
                        timeout: 4000
                    };
                    $scope.$emit('notify', notify);
                }
            });
        }

        vm.getStatusCadastroInstituicao = function() {
            estabelecimentoService.getStatusCadastroInstituicao(vm.userid).then(function(response) {
                if (response.status == 0) {
                    vm.listaAutorizacoes = response.autorizacoes;
                    for (var i = 0; i < vm.listaAutorizacoes.length; i++) {
                        vm.showMsg[i] = false;
                    }
                } else {
                    var notify = {
                        type: 'error',
                        title: response.message,
                        content: '',
                        timeout: 4000
                    };
                    $scope.$emit('notify', notify);
                }
            });
        }
        vm.toogleShowMsg = function(index) {
            vm.showMsg[index] = !vm.showMsg[index];
        }

        vm.limparConsulta = function() {
            vm.showResultConsulta = false;
            vm.consultaMat = "";
        }

        vm.toggleSideNav = function() {
            vm.toggle = !vm.toggle;
        }

        vm.logout = function() {
            authService.logout();
            $location.path("/login");
        }

    }
})();