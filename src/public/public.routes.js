(function() {
    'use strict';

    angular.module('public')
    .config(routeConfig);

    /**
     * Configures the routes and views
     */
     routeConfig.$inject = ['$stateProvider'];

     function routeConfig($stateProvider) {

        // Routes
        $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'src/public/login/login.html',
            controller: 'loginController',
            controllerAs: 'loginCtrl'           

        })
        .state('aluno', {
            url: '/aluno',
            templateUrl: 'src/public/aluno/aluno.html',
            controller: 'alunoController',
            controllerAs: 'alunoCtrl',
            resolve: {
                auth: ["$q", "authService", function($q, authService) {
                  var userInfo = authService.getUserInfo();
                  if (userInfo && userInfo.userType == 2) {
                    return $q.when(userInfo);
                } else {
                    return $q.reject({ authenticated: false });
                }
            }]
        }
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
            controllerAs: 'estabelecimentoCtrl',
            resolve: {
                auth: ["$q", "authService", function($q, authService) {
                  var userInfo = authService.getUserInfo();

                  if (userInfo && userInfo.userType == 1) {
                    return $q.when(userInfo);
                } else {
                    return $q.reject({ authenticated: false });
                }
            }]
        }
    })
        .state('cadastroEstabelecimento', {
            url: '/cadastroEstabelecimento',
            templateUrl: 'src/public/estabelecimento/cadastroEstabelecimento.html',
            controller: 'cadastroEstabelecimentoController',
            controllerAs: 'cadastroEstabelecimentoCtrl'
        })
        .state('instituicao', {
            url: '/instituicao',
            templateUrl: 'src/public/instituicao/instituicao.html',
            controller: 'instituicaoController',
            controllerAs: 'instituicaoCtrl',
            resolve: {
                auth: ["$q", "authService", function($q, authService) {
                  var userInfo = authService.getUserInfo();

                  if (userInfo && userInfo.userType == 0) {
                    return $q.when(userInfo);
                } else {
                    return $q.reject({ authenticated: false });
                }
            }]
        }
    })
        .state('cadastroInstituicao', {
            url: '/cadastroInstituicao',
            templateUrl: 'src/public/instituicao/cadastroInstituicao.html',
            controller: 'cadastroInstituicaoController',
            controllerAs: 'cadastroInstituicaoCtrl'
        })
        .state('cadastroSelector', {
            url: '/cadastro',
            templateUrl: 'src/public/tipo-cad-selector/tipoCadSelector.html',
            controller: 'cadastroAlunoController',
            controllerAs: 'cadastroAlunoCtrl'
        })

        ;
    }
})();