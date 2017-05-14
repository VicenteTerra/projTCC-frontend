(function() {
    'use strict';
    angular.module('public')
    .controller('cadastroEstabelecimentoController', cadastroEstabelecimentoController);

    cadastroEstabelecimentoController.$inject = ['estabelecimentoService', '$location', '$scope', '$mdDialog'];

    function cadastroEstabelecimentoController(estabelecimentoService, $location, $scope, $mdDialog) {
        var vm = this;
        vm.novoUsuario = {};
        vm.tipoEstabelecimentoList = [{ nome: "Cinema/Teatro" }, { nome: "Shows/Eventos" }, { nome: "Transporte" }];


        vm.salvarNovoUsuario = function() {

            if (vm.novoUsuario.senha != vm.novoUsuario.confirmaSenha) {
                var notify = {
                    type: 'error',
                    title: 'Senhas não conferem. Digite duas senhas iguais!',
                    content: '',
                    timeout: 5000 //time in ocams
                };
                $scope.$emit('notify', notify);
            } else {
                estabelecimentoService.criarEstabelecimento(vm.novoUsuario).then(function(response) {
                    if (response.status === 0) {
                        var notify = {
                            type: 'success',
                            title: 'Cadastro realizado com sucesso!',
                            content: '',
                            timeout: 5000 //time in ocams
                        };
                        $scope.$emit('notify', notify);
                        $location.path('/login');
                    } else {
                        var notify = {
                            type: 'error',
                            title: 'Não foi possível realizar o cadastro!',
                            content: '',
                            timeout: 5000 //time in ms
                        };
                        $scope.$emit('notify', notify);
                    }
                });
            }
        };

        vm.showModalTermos = function(ev) {
            $mdDialog.show({
                controller: cadastroEstabelecimentoController,
                templateUrl: 'src/public/estabelecimento/termosAceite.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        };


    }
})();