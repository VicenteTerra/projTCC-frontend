(function () {

  angular.module('common')
    .service('authService', authService);

  authService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'alunoService'];
  function authService($http, $cookies, $rootScope, $timeout, alunoService) {
    var service = this;


    service.autentica = function (email, senha) {
      var data = {
        email: email,
        senha: senha
      };

      return $http.post('http://localhost:9000/aluno/login', data)
        .then(function (response) {
          return response.data;
        });    
    }


  }

})();
