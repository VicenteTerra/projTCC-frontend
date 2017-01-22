(function () {

angular.module('public')
.component('sidebarAluno', {
  templateUrl : 'src/public/components/sidebar-aluno/sidebar.aluno.html',
  bindings : {
    sidebar: '<'
  }
});

})();
