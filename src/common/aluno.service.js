(function() {

    angular.module('common')
        .service('alunoService', alunoService);

    alunoService.$inject = ['$http' , 'baseUrl'];

    function alunoService($http, baseUrl) {
        var service = this

        service.getAll = function() {
            return $http.get(baseUrl+'/aluno/all')
                .then(function(response) {
                    return response.data;
                });
        }

        service.criarAluno = function(user) {

            var data = {
                nome: user.nome,
                cpf: user.cpf,
                email: user.email,
                telefone: user.celular,
                instituicao: user.instituicao,
                matricula: user.matricula,
                dataNascimento: user.dataNascimento,
                senha: user.senha
            };

            return $http.post(baseUrl+'/aluno/new', data)
                .then(function(response) {
                    return response.data;
                });
        }

        service.updateAluno = function(aluno) {
            return $http.post(baseUrl+'/aluno/update', aluno)
                .then(function(response) {
                    return response.data;
                });
        }

        service.changeAtivo = function(id) {
            return $http.get(baseUrl+'/aluno/changeAtivo/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

        service.removeAluno = function(id) {
            return $http.get(baseUrl+'/aluno/delete/' + id)
                .then(function(response) {
                    return response.data;
                });
        }
        service.getAlunoById = function(id) {
            return $http.get(baseUrl+'/aluno/' + id)
                .then(function(response) {
                    return response.data;
                });
        }
        service.getAlunoByCpf = function(cpf, id) {
            return $http.get(baseUrl+'/aluno/consulta/' + cpf + "/" + id)
                .then(function(response) {
                    return response.data;
                });
        }

    }

})();