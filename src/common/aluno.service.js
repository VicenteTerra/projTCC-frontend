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

  return $http.get('http://localhost:9000/todosAlunos')
              .then(function (response) {
                return response.data;
            });
  //  return service.list;
  }

  service.criar = function (user) {
     console.log("service criar");
    // service.list.push(user);
    // console.log(service.list);
    return $http.post('http://localhost:9000/novoAluno')
    .then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };


}

})();
