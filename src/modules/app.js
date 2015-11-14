angular.module('app', [
    'ui.router',
  require('./common').name,
  require('./c3-charts').name,
  require('./main').name,
	require('./sidebar').name
])
.run(['$rootScope', '$state', '$stateParams', ($rootScope, $state, $stateParams) => {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);