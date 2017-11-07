(function() {

    angular.module('common')
        .service('instituicaoService', instituicaoService);

    instituicaoService.$inject = ['$http' , 'baseUrl'];

    function instituicaoService($http, baseUrl) {
        var service = this;

        service.criarInstituicao = function(instituicao) {
            var data = {
                nome: instituicao.nome,
                email: instituicao.email,
                telefone: instituicao.telefone,
                senha: instituicao.senha,
                endereco: instituicao.endereco,
                nomeResponsavel: instituicao.nomeResponsavel,
                cpfResponsavel: instituicao.cpfResponsavel,
                classeConsulta : instituicao.classeConsulta

            }
            return $http.post(baseUrl+'/instituicao/new', data)
                .then(function(response) {
                    return response.data;
                });
        }

        service.getInstituicoes = function() {
            return $http.get(baseUrl+'/instituicao/all')
                .then(function(response) {
                    return response.data;
                });
        }

        service.downloadDoc = function(cnpj, nome) {
            return $http.get(baseUrl+'/instituicao/downloadDoc/' + cnpj + '/' + nome, {
                responseType: 'arraybuffer'
            }).then(function(response) {
                return response.data;
            });
        }
        service.listDocumentos = function(cnpj, id) {
            return $http.get(baseUrl+'/instituicao/listFilesEstabelecimento/' + cnpj).then(
                function(response) {
                    return response.data;
                });
        }
        service.autoriza = function(idEstab, idInst) {
            var dataRequest = {
                idEstabelecimento : idEstab,
                idInstituicao : idInst
            }
            return $http.post(baseUrl+'/instituicao/autorizaEstabelecimento', dataRequest).then(
                function(response) {
                    return response.data;
                });
        }
        service.desautoriza = function(idEstab, idInst, msg) {
              var dataRequest = {
                idEstabelecimento : idEstab,
                idInstituicao : idInst,
                msg : msg
            }
            return $http.post(baseUrl+'/instituicao/desautorizaEstabelecimento' , dataRequest).then(
                function(response) {
                    return response.data;
                });
        }

        service.getEstabelecimentos = function(id) {
            return $http.get(baseUrl+'/instituicao/getEstabelecimentosInst/' + id)
                .then(function(response) {
                    return response.data;
                });
        }
    }

})();