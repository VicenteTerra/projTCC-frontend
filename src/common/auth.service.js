(function () {

  angular.module('common')
  .service('authService', authService);

  authService.$inject = ['$http', '$cookies', '$rootScope', '$timeout' ,'alunoService' ];
  function authService($http, $cookies, $rootScope, $timeout, alunoService ) {
    var service = this;


    service.autentica = function (username , password) {
      /* Dummy authentication for testing, uses $timeout to simulate api call */

              if(alunoService.getAlunoByUserName(username , password)){
                return true;
              }
              else{
                return false;
              }

            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });
    }


  }

})();
