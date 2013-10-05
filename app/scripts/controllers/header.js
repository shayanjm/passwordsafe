window.angular.module('psa.controllers.header', [])
  .controller('HeaderController', ['$scope', 'Global',
    function ($scope, Global) {
      $scope.global = Global;
    }]);
