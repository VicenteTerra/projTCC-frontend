(function() {

    angular.module('common')
        .service('alunoService', alunoService);

    alunoService.$inject = ['$http'];

    function alunoService($http) {
        var service = this

        service.getAll = function() {
            return $http.get('http://localhost:9000/aluno/all')
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
                dataNascimento: user.dataNascimento,
                senha: user.senha
            };

            return $http.post('http://localhost:9000/aluno/new', data)
                .then(function(response) {
                    return response.data;
                });
        }

        service.updateAluno = function(aluno) {
            return $http.post('http://localhost:9000/aluno/update', aluno)
                .then(function(response) {
                    return response.data;
                });
        }

        service.changeAtivo = function(id) {
            return $http.get('http://localhost:9000/aluno/changeAtivo/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

        service.removeAluno = function(id) {
            return $http.get('http://localhost:9000/aluno/delete/' + id)
                .then(function(response) {
                    return response.data;
                });
        }
        service.getAlunoById = function(id) {
            return $http.get('http://localhost:9000/aluno/' + id)
                .then(function(response) {
                    return response.data;
                });
        }
        service.getAlunoByCpf = function(cpf, id) {
            return $http.get('http://localhost:9000/aluno/consulta/' + cpf + "/" + id)
                .then(function(response) {
                    return response.data;
                });
        }

    }

})();