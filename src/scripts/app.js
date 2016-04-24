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
    var timeStr = new Date().toDateString();
    $scope.text = `Hey! time is ${timeStr}`;
  });