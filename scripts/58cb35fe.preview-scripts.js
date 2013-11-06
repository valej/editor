"use strict";angular.module("bricksApp.storage",["firebase"]).factory("localData",["$rootScope","$window",function(a,b){var c,d=a.$new(),e=function(a){var d=b.localStorage.getItem(c+a);return d?angular.fromJson(d):[]},f=function(a){var e=d.data[a]?angular.toJson(d.data[a]):"";b.localStorage.setItem(c+a,e)};return d.data={},function(a){return c="bricks_app_"+a.id+"_",a.tables.forEach(function(a){d.data[a.name]=e(a.name),d.$watch("data."+a.name,function(){f(a.name)},!0)}),d.data}}]).factory("firebaseData",["$rootScope","angularFire",function(a,b){return function(c){var d=a.$new();return d.data={},c.tables.forEach(function(a){d.data[a.name]=[],b(new Firebase("https://"+c.settings.firebase+".firebaseio.com/"+a.name),d,"data."+a.name)}),d.data}}]).factory("Storage",["firebaseData","localData",function(a,b){var c,d=function(d){c="firebase"===d.storage?a(d):b(d)};return d.prototype.all=function(a){return a?c[a]:c},d.prototype.get=function(a,b){var d;return c[a]&&c[a].some(function(a){return a.id===b?(d=a,!0):void 0}),d},d.prototype.add=function(a,b){var d=(new Date).toISOString().split(".")[0].replace("T"," ");b.id=uuid(),b.created_at=d,b.updated_at=d,c[a]=c[a]||[],c[a].push(b)},d.prototype.update=function(a,b){c[a]&&c[a].some(function(d,e){return d.id===b.id?(c[a][e]=b,!0):void 0})},d.prototype.remove=function(a,b){c[a]&&c[a].some(function(d,e){return d.id===b.id?(c[a].splice(e,1),!0):void 0})},d.prototype.clear=function(a){c[a].length=0},d}]),angular.module("bricksApp",["ngRoute","bricksApp.storage"]).config(["$routeProvider",function(a){window.bricksApp.pages.forEach(function(b){a.when(b.url,{controller:"MainCtrl",template:b.template})}),a.otherwise({template:"Nothing Found."})}]).run(["$window",function(a){angular.element("#bricksAppStyle").html(a.bricksApp.css)}]).controller("MainCtrl",["$routeParams","$scope","$window","Storage",function($routeParams,$scope,$window,Storage){var routeKeys=Object.keys($routeParams),storage=new Storage($window.bricksApp);$scope.data=storage.all(),routeKeys.length>0&&routeKeys.forEach(function(a){$scope[a]=storage.get(a,$routeParams[a])||{}}),$scope.save=function(a,b){b.id?storage.update(a,b):storage.add(a,angular.copy(b)),$scope[a]={},$scope.submitted=!0},$scope.delete=function(a,b){storage.remove(a,b)},eval($window.bricksApp.js)}]);