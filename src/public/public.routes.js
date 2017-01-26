
(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {

  // Routes
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'src/public/login/login.html',
      controller : 'loginController',
      controllerAs : 'loginCtrl'

    })
    .state('aluno', {
      url: '/aluno',
      templateUrl: 'src/public/aluno/aluno.html',
      controller: 'alunoController',
      controllerAs: 'alunoCtrl'

    })
    .state('cadastroAluno', {
      url: '/cadastroAluno',
      templateUrl: 'src/public/aluno/cadastroAluno.html',
      controller: 'cadastroAlunoController',
      controllerAs: 'cadastroAlunoCtrl'

    })
    .state('estabelecimento', {
      url: '/estabelecimento',
      templateUrl: 'src/public/estabelecimento/estabelecimento.html',
      controller: 'estabelecimentoController',
      controllerAs: 'estabelecimentoCtrl'

    });
}
})();
