(function() {

    angular.module('common')
        .service('estabelecimentoService', estabelecimentoService);

    estabelecimentoService.$inject = ['$http'];

    function estabelecimentoService($http) {
        var service = this;

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
            return $http.post('http://localhost:9000/estabelecimento/new', data)
                .then(function(response) {
                    return response.data;
                });
        }

        service.getEstabelecimentos = function() {
            return $http.get('http://localhost:9000/estabelecimento/all')
                .then(function(response) {
                    return response.data;
                });
        }

        service.getEstabelecimentosByInst = function(id) {
            return $http.get('http://localhost:9000/instituicao/getEstabelecimentosInst/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

    }
})();