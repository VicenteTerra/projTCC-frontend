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

        service.downloadDoc = function(cnpj , nome){
            return $http.get('http://localhost:9000/instituicao/downloadDoc/' + cnpj+'/'+nome, {
                responseType : 'arraybuffer'
            }).then(function(response) {
               return response.data;
           });
        }
        service.listDocumentos = function(cnpj, id){
           return $http.get('http://localhost:9000/instituicao/listFilesEstabelecimento/' + cnpj ).then(
            function(response) {
               return response.data;
           });
       }
       service.autoriza = function(idEstab , idInst){
        return $http.get('http://localhost:9000/instituicao/autorizaEstabelecimento/' + idEstab+ '/' + idInst).then(
            function(response) {
               return response.data;
           });
    }
    service.desautoriza = function(idEstab , idInst){
        return $http.get('http://localhost:9000/instituicao/desautorizaEstabelecimento/' + idEstab+ '/' + idInst).then(
            function(response) {
               return response.data;
           });
    }

    service.getEstabelecimentos = function(id){
     return $http.get('http://localhost:9000/instituicao/getEstabelecimentosInst/'+id)
     .then(function(response) {
        return response.data;
    }); 
 }
}

})();