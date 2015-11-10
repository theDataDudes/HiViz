angular.module('hivisApp', [
  'ui.router',
  require('./main').name,
  require('./common').name
])
.run(['$rootScope', '$state', '$stateParams', ($rootScope, $state, $stateParams) => {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);