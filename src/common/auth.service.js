(function() {

    angular.module('common')
        .factory('authService', authService);

    authService.$inject = ['$http', 'alunoService', '$q', '$window'];

    function authService($http, alunoService, $q, $window) {
        var userInfo;


        function login(userName, password) {
            var deferred = $q.defer();

            $http.post("http://localhost:9000/usuario/auth", {
                userName: userName,
                password: password
            }).then(function(result) {
                userInfo = result.data;
                $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                deferred.resolve(userInfo);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();

            $http({
                method: "POST",
                url: "http://localhost:9000/usuario/logout"
            }).then(function(result) {
                $window.sessionStorage["userInfo"] = null;
                userInfo = null;
                deferred.resolve(result);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        return {
            login: login,
            getUserInfo: getUserInfo,
            logout: logout,
            init: init
        };

        function getUserInfo() {
            return userInfo;
        }

        function init() {
            if ($window.sessionStorage["userInfo"]) {
                userInfo = JSON.parse($window.sessionStorage["userInfo"]);
            }
        }
    }

})();