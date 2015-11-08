angular.module('hivisApp', [
  'ui.router'
]);

angular.module('hivisApp')
  .config( ($stateProvider, $urlRouterProvider) => {
    // for unmatched urls redirect to default view
    $urlRouterProvider.otherwise('/default');

    // $stateProvider
    //   .state('default', {
    //     url : '',
    //     templateUrl : ''
    //   })

  })