angular.module('app', [
    'ui.router',
    'rzModule',
  require('./common').name,
  require('./sideCharts').name,
  require('./c3-charts').name,
  require('./main').name,
	require('./sidebar').name,
])
.run(['$rootScope', '$state', '$stateParams', ($rootScope, $state, $stateParams) => {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);