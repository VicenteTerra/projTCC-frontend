(function () {

angular.module('public')
.component('sidebarEstabelecimento', {
  templateUrl : 'src/public/components/sidebar-estabelecimento/sidebar.estabelecimento.html',
  bindings : {
    sidebar: '<'
  }
});

})();
