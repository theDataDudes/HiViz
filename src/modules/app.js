angular.module('app', [
  'ui.router',
  require('./common').name,
  require('./charts').name,
  require('./main').name
])
.run(['$rootScope', '$state', '$stateParams', ($rootScope, $state, $stateParams) => {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);