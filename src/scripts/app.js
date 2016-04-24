angular.module('app', []);

angular.module('app')
  .directive('myTemplate', function () {
    return {
      restrict: 'E',
      templateUrl: 'my-tmpl.html'
    }
  });

angular.module('app')
  .controller('SampleController', function ($scope) {
    $scope.text = 'hey!';
  });