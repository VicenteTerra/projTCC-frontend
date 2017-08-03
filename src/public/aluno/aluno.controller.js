(function() {
    'use strict'
    angular.module('public')
        .controller('alunoController', alunoController);

    alunoController.$inject = ['alunoService', 'authService', '$scope', '$mdSidenav', '$location', 'instituicaoService'];

    function alunoController(alunoService, authService, $scope, $mdSidenav, $location, instituicaoService) {
        var vm = this;
        vm.toggle = true;
        vm.usuarioLogado = authService.getUserInfo().userName.split(' ')[0];
        vm.userid = authService.getUserInfo().userId;
        vm.aluno = null;
        vm.isEdit = false;
        vm.instituicaoSelected = {};
        vm.instituicaoList = [];

        vm.loadAluno = function() {
            alunoService.getAlunoById(vm.userid).then(function(response) {
                vm.aluno = response.aluno;
                vm.getInstituicoes();
            });
        }
        vm.loadAluno();

        vm.toogleEdit = function() {
            vm.isEdit = !vm.isEdit;
            vm.loadAluno();
        }

        vm.getInstituicoes = function() {
            instituicaoService.getInstituicoes().then(function(response) {
                vm.instituicaoList = response.listaInstituicoes;
                for (var i = 0; i < vm.instituicaoList.length; i++) {
                    if (vm.instituicaoList[i].id === vm.aluno.instituicaoId) {
                        vm.instituicaoSelected = vm.instituicaoList[i].id;
                        break;
                    }
                }
            })
        }

        vm.changeAtivo = function() {
            alunoService.changeAtivo(vm.userid).then(function(response) {
                if (response.status == 0) {
                    var notify = {
                        type: 'success',
                        title: response.message,
                        content: '',
                        timeout: 5000 //time in ocams
                    };
                    $scope.$emit('notify', notify);
                    vm.loadAluno();
                } else {
                    var notify = {
                        type: 'error',
                        title: response.message,
                        content: '',
                        timeout: 8000 //time in ocams
                    };
                    $scope.$emit('notify', notify);
                    vm.loadAluno();
                }
            })
        }

        vm.removeAluno = function(index) {
            alunoService.removeAluno(index).then(function() {
                vm.loadAlunos();
            });
        }

        vm.updateAluno = function() {
            vm.aluno.instituicaoId = vm.instituicaoSelected;
            alunoService.updateAluno(vm.aluno).then(function(response) {
                if (response.status == 0) {
                    var notify = {
                        type: 'success',
                        title: response.message,
                        content: '',
                        timeout: 5000 //time in ocams
                    };
                    $scope.$emit('notify', notify);
                    vm.toogleEdit();
                    vm.loadAluno();
                } else {
                    var notify = {
                        type: 'error',
                        title: response.message,
                        content: '',
                        timeout: 5000 //time in ocams
                    };
                    $scope.$emit('notify', notify);
                }

            })
        }

        vm.logout = function() {
            authService.logout();
            $location.path("/login");
        }

    }
})();