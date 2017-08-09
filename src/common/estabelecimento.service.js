(function() {

    angular.module('common')
        .service('estabelecimentoService', estabelecimentoService);

    estabelecimentoService.$inject = ['$http' , 'baseUrl'];

    function estabelecimentoService($http , baseUrl) {
        var service = this;
        console.log(baseUrl)

        service.criarEstabelecimento = function(estabelecimento) {
            var data = {
                nome: estabelecimento.nome,
                email: estabelecimento.email,
                telefone: estabelecimento.telefone,
                cnpj: estabelecimento.cnpj,
                tipoEstabelecimento: estabelecimento.tipoEstabelecimento,
                senha: estabelecimento.senha,
                endereco: estabelecimento.endereco,
                nomeResponsavel: estabelecimento.nomeResponsavel,
                cpfResponsavel: estabelecimento.cpfResponsavel,
                files: estabelecimento.files
            }
            return $http.post(baseUrl+'/estabelecimento/new', data)
                .then(function(response) {
                    return response.data;
                });
        }

        service.getEstabelecimentos = function() {
            return $http.get(baseUrl+'/estabelecimento/all')
                .then(function(response) {
                    return response.data;
                });
        }

        service.getEstabelecimentosByInst = function(id) {
            return $http.get(baseUrl+'/instituicao/getEstabelecimentosInst/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

    }
})();