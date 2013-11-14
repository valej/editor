'use strict';

angular.module('bricksApp.ui')
  .directive('pages', function ($timeout, $window, apps) {
    return {
      replace: true,
      require: '^ui',
      restrict: 'E',
      templateUrl: 'scripts/ui/pages/pages.html',
      link: function (scope, element, attrs, uiCtrl) {
        var changed = false;

        scope.newPage = {template: ''};
        scope.showModal = false;
        scope.savePageText = 'Save';
        scope.current = {};

        scope.setCurrent = function (current) {
          scope.current = current;
          uiCtrl.page(current);
          scope.showMenu = false;
        };

        scope.$watch(function () {
          return apps.current().id;
        }, function (app) {
          scope.app = apps.current();
          scope.setCurrent(scope.app.pages[0]);
        });

        scope.$watch(function () {
          return uiCtrl.page().template;
        }, function (newValue, oldValue) {
          if (newValue !== oldValue) {
            changed = true;
          }
        });

        $window.addEventListener('beforeunload', function (e) {
          if (changed) {
            var message = 'You have unsaved changes on this page. ' +
              'If you leave without saving your changes will be lost.';
            (e || $window.event).returnValue = message;
            return message;
          }
        });

        scope.addPage = function () {
          var newPage = angular.copy(scope.newPage);

          scope.app.pages.push(newPage);
          apps.update(scope.app);
          scope.setCurrent(newPage);

          scope.newPage = {template: ''};
          scope.showModal = false;
        };

        // Saves the current page.
        scope.savePage = function () {
          apps.update(scope.app);
          changed = false;

          scope.savePageText = 'Saving...';
          $timeout(function () {
            scope.savePageText = 'Save';
          }, 1000);
        };

        scope.deletePage = function () {
          if ($window.confirm('Are you sure you want to delete this page?')) {
            scope.app.pages.some(function (p, i) {
              if (scope.current.url === p.url) {
                scope.app.pages.splice(i, 1);
                return true;
              }
            });
            apps.update(scope.app);
            scope.setCurrent(scope.app.pages[0]);
          }
        };
      }
    };
  });
