(function() {
    'use strict';
    angular.module('public')
    .controller('cadastroAlunoController', cadastroAlunoController);

    cadastroAlunoController.$inject = ['alunoService','instituicaoService', '$location', '$scope', '$state', '$mdDialog'];

    function cadastroAlunoController(alunoService, instituicaoService, $location, $scope, $state, $mdDialog) {
        var vm = this;
        vm.novoUsuario = {};
        vm.instituicaoList = {};
        vm.instituicaoSelected = {};

        instituicaoService.getInstituicoes().then(function(response) {
            if (response.status === 0) {
                vm.instituicaoList = response.listaInstituicoes;
            } else {

            }
        });

        vm.cadSelector = [{ nome: "Estabelecimento" }, { nome: "Aluno"} , {nome : "Instituição de Ensino"}];
        vm.cadSelected = {};

        vm.selectTypeCad = function() {
            if (vm.cadSelected === "Estabelecimento") {
                $state.go("cadastroEstabelecimento");
            } 
            if(vm.cadSelected === "Aluno"){
                $state.go("cadastroAluno");
            }
            if(vm.cadSelected === "Instituição de Ensino"){
                $state.go("cadastroInstituicao");
            }

        }

        vm.salvarNovoUsuario = function() {
            console.log(vm.novoUsuario);
            if (vm.novoUsuario.senha != vm.novoUsuario.confirmaSenha) {
                var notify = {
                    type: 'error',
                    title: 'Senhas não conferem. Digite duas senhas iguais!',
                    content: '',
                    timeout: 5000 //time in ocams
                };
                $scope.$emit('notify', notify);
            } else {
                alunoService.criarAluno(vm.novoUsuario).then(function(response) {
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
        }

        vm.showModalTermos = function(ev) {
            $mdDialog.show({
                controller: cadastroAlunoController,
                templateUrl: 'src/public/aluno/termoAceiteAluno.html',
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