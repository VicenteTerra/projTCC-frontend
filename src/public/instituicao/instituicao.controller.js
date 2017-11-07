(function() {
    'use strict'
    angular.module('public')
        .controller('instituicaoController', instituicaoController);

    instituicaoController.$inject = ['$location', '$scope', 'authService', '$mdSidenav',
        'estabelecimentoService', 'instituicaoService', '$mdDialog'
    ];

    function instituicaoController($location, $scope, authService, $mdSidenav, estabelecimentoService, instituicaoService, $mdDialog) {
        var vm = this;
        vm.usuarioLogado = authService.getUserInfo().userName.split(' ')[0];
        vm.userid = authService.getUserInfo().userId;
        vm.toggle = true;
        vm.listaEstabelecimentos = {};
        vm.documentos = [];
        vm.showdocs = false;

        vm.getEstabelecimentos = function() {
            instituicaoService.getEstabelecimentos(vm.userid).then(function(response) {
                if (response.status == 0) {
                    vm.listaEstabelecimentos = response.listaEstabelecimentos;
                    //console.log(vm.usuarioConsulta);
                } else {
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

        vm.getEstabelecimentos();
        vm.logout = function() {
            authService.logout();
            $location.path("/login");
        }

        vm.toggleSideNav = function() {
            vm.toggle = !vm.toggle;
        }


        vm.listDocumentos = function(cnpj, index) {
            instituicaoService.listDocumentos(cnpj, vm.userid).then(function(response) {
                vm.documentos[index] = response.data;
                vm.showdocs = true;
            });
        }
        vm.hideDocs = function() {
            vm.showdocs = false;
        }

        vm.download = function(cnpj, nome) {
            instituicaoService.downloadDoc(cnpj, nome).then(function(response) {
                var reportFile = response;
                var file = new Blob([reportFile], {
                    type: 'application/pdf'
                });

                var isChrome = !!window.chrome && !!window.chrome.webstore;
                var isIE = /*@cc_on!@*/ false || !!document.documentMode;
                var isEdge = !isIE && !!window.StyleMedia;


                if (isChrome) {
                    var url = window.URL || window.webkitURL;

                    var downloadLink = angular.element('<a></a>');
                    downloadLink.attr('href', url.createObjectURL(file));
                    downloadLink.attr('target', '_self');
                    downloadLink.attr('download', nome);
                    downloadLink[0].click();
                } else if (isEdge || isIE) {
                    window.navigator.msSaveOrOpenBlob(file, nome);

                } else {
                    var fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                }
            });
        }

        vm.autorizaEstab = function(estabid) {

            instituicaoService.autoriza(estabid, vm.userid).then(function(response) {
                if (response.status == 0) {
                    vm.getEstabelecimentos();
                    var notify = {
                        type: 'success',
                        title: response.message,
                        content: '',
                        timeout: 5000
                    };
                    $scope.$emit('notify', notify);
                } else {
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

        vm.desautoriza = function(estabid, ev) {

            var confirm = $mdDialog.prompt()
                .title('Remover Permissão')
                .textContent('Descreva o motivo da proibição ao estabelecimento.')
                .placeholder('Digite a mensagem')
                .ariaLabel('Conteúdo da mensagem')
                .targetEvent(ev)
                .ok('Confirmar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function(result, estabelecimento) {
                instituicaoService.desautoriza(estabid, vm.userid, result).then(function(response) {
                    if (response.status == 0) {
                        vm.getEstabelecimentos();
                        var notify = {
                            type: 'success',
                            title: response.message,
                            content: '',
                            timeout: 5000
                        };
                        $scope.$emit('notify', notify);
                    } else {
                        var notify = {
                            type: 'error',
                            title: response.message,
                            content: '',
                            timeout: 5000
                        };
                        $scope.$emit('notify', notify);
                    }
                });

            }, function() {
            });
        }
    
    }
})();