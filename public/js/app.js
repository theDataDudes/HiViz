angular.module('hivisApp', [
  'ui.router'
]);

angular.module('hivisApp')
  .config( ($stateProvider, $urlRouterProvider) => {
    // for unmatched urls redirect to default view

    $stateProvider
      .state('default', {
        url : '/',
        templateUrl : 'views/default.html'
      })
      .state('about', {
        url : '/about',
        templateUrl : 'views/about.html'
      });

    $urlRouterProvider.otherwise('/');
  })
  .run(['$rootScope', '$state', '$stateParams', ($rootScope, $state, $stateParams) => {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }]);