(function () {

  angular.module('common')
  .service('alunoService' , alunoService);

  alunoService.$inject = [];
  function alunoService() {
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

    for(var i = 0; i < service.alunoList.length; i++){
      console.log(alunoList[i].username);
      if((username === alunoList[i].username) && (password === alunoList[i].password)){
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
    return service.list;
  }

  service.criar = function (user) {
    console.log(user.firstName);
    service.list.push(user);
    console.log(service.list);
  }

}

})();
