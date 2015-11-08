angular.module('hivisApp', [
  'ui.router'
]);

angular.module('hivisApp')
  .config( ($stateProvider, $urlRouterProvider) => {
    // for unmatched urls redirect to default view
    $urlRouterProvider.otherwise('/default');

    $stateProvider
      .state('default', {
        url : '/',
        templateUrl : 'views/default.html'
      })
      .state('about', {
        url : '/about',
        templateUrl : 'views/about.html'
      });

  })
  .run(['$rootScope', '$state', '$stateParams', ($rootScope, $state, $stateParams) => {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }]);