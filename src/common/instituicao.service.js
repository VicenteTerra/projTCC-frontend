(function() {

    angular.module('common')
    .service('instituicaoService', instituicaoService);

    instituicaoService.$inject = ['$http'];

    function instituicaoService($http) {
        var service = this;

        service.criarInstituicao = function(instituicao) {
            var data = {
                nome: instituicao.nome,
                email: instituicao.email,
                telefone: instituicao.telefone,
                senha: instituicao.senha,
                endereco: instituicao.endereco,
                nomeResponsavel: instituicao.nomeResponsavel,
                cpfResponsavel: instituicao.cpfResponsavel
                
            }
            return $http.post('http://localhost:9000/instituicao/new', data)
            .then(function(response) {
                return response.data;
            });
        }

        service.getInstituicoes = function(){
            return $http.get('http://localhost:9000/instituicao/all')
            .then(function(response) {
                return response.data;
            });
        }

    }
})();