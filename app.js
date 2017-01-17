(function () {
  'use strict';

  angular.module('myApp', ['ngMaterial'])
  .controller('myAppController', myAppController);

  myAppController.$inject = ['$scope'];
  function myAppController($scope) {

    $scope.user = {
      login : "",
      password : ""
    };

    $scope.login  = function () {

    };
  }
})();
