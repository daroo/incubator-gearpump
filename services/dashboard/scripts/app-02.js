/* *
 * The MIT License
 * 
 * Copyright (c) 2014, Sebastian Sdorra
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
'use strict';

angular.module('app-02', ['adf', 'app.widgets.visdag'])
.controller('app02Ctrl', function($scope, $rootScope, $http){
  
  var name = 'app-02';
  var model = null;//localStorageService.get(name);
  if (!model) {
    model = {
      title: " ",
      structure: "4-8",
      rows: [{
        columns: [{
          widgets: [
            {
              type: "visdag",
              config: {
              },
              title: "DAG"
            }
          ]
        }]
      }]      
    };
  }
  $scope.name = name;
  $scope.model = model;
  $scope.collapsible = false;

  $scope.loadDag = function(appId) {
    $scope.$broadcast('appmaster-selected', {appId: appId});
  }

  var url = location.origin + '/appmasters';
  $http.get(url).then(function (response) {
    var masters = response.data.appMasters;
    $scope.apps = masters.map(function(app) {
      return {
        id: app.appId,
        name: app.appName,
        workerPath: app.workerPath
      };
    });
  }, function (err) {
  console.log(err);
    throw err;
  });
});
