angular.module('app', [
    'ui.router',
    'rzModule',
  require('./common').name,
  require('./sideCharts').name,
  require('./c3-charts').name,
  require('./main').name,
	require('./sidebar').name,
])
.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window) {
  $rootScope
    .$on('$stateChangeSuccess',
      function(event) {
        if(!$window.ga)
          return;
        $window.ga('send', 'pageview', { page: $location.path() });
      });
}]);