'use strict';

angular.module('bricksApp')
  .directive('deviceSwitch', function () {
    return {
      restrict: 'E',
      scope: {
        iframe: '@'
      },
      templateUrl: 'views/device-switch.html',
      link: function (scope) {
        var iframe = angular.element(scope.iframe);

        scope.devices = [
          'mobile', 'tablet', 'laptop', 'desktop', 'resize-full'
        ];
        scope.currentDevice = 'resize-full';

        scope.$watch('currentDevice', function (value, oldValue) {
          iframe.removeClass('device-' + oldValue).addClass('device-' + value);
        });
      }
    };
  });
