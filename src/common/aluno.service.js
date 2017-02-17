(function () {

  angular.module('common')
  .service('alunoService' , alunoService);

  alunoService.$inject = ['$http'];
  function alunoService($http) {
  var service = this;
  service.list = [{
    firstName: 'adm',
    lastName: 'adm',
    password: 'adm',
    city: 'adm',
    status: 'matriculado'
  },{
    firstName: 'estab',
    lastName: 'estab',
    password: 'estab',
    city: 'estab',
    status: 'trancado'
  }];

  service.getAlunoByUserName = function(username , password){

    for(var i = 0; i < service.list.length; i++){
      if((username === service.list[i].firstName) && (password === service.list[i].password)){
      return true;
      }
    }

  }

  service.getAlunoByName = function (name) {
    for(var i = 0 ; i < service.list.length; i++){
      if(service.list[i].firstName === name){
        console.log("achei" + service.list[i].firstName);
        return service.list[i];
      }
    }
  }

  service.getAll = function () {
    return $http.get('http://localhost:9000/aluno/all')
              .then(function (response) {
                return response.data;
            });
  }

  service.criarAluno = function (user) {

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
    .then(function (response) {
      return response.data;
    });
  }

  service.removeAluno = function (id){
    return $http.get('http://localhost:9000/aluno/delete/' + id)
      .then(function (response) {
        return response.data;
      });
  }

  service.getAlunoByCpf = function (cpf) {
    return $http.get('http://localhost:9000/aluno/consulta/' + cpf)
      .then(function (response) {
        return response.data;
      });
  }

}

})();
