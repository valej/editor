!function(a,b){"use strict";function c(){function a(a,c){return b.extend(new(b.extend(function(){},{prototype:a})),c)}function c(a,b){var c=b.caseInsensitiveMatch,d={originalPath:a,regexp:a},e=d.keys=[];return a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?|\*])?/g,function(a,b,c,d){var f="?"===d?d:null,g="*"===d?d:null;return e.push({name:c,optional:!!f}),b=b||"",""+(f?"":b)+"(?:"+(f?b:"")+(g&&"(.+?)"||"([^/]+)")+(f||"")+")"+(f||"")}).replace(/([\/$\*])/g,"\\$1"),d.regexp=new RegExp("^"+a+"$",c?"i":""),d}var d={};this.when=function(a,e){if(d[a]=b.extend({reloadOnSearch:!0},e,a&&c(a,e)),a){var f="/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";d[f]=b.extend({redirectTo:a},c(f,e))}return this},this.otherwise=function(a){return this.when(null,a),this},this.$get=["$rootScope","$location","$routeParams","$q","$injector","$http","$templateCache","$sce",function(c,e,f,g,h,i,j,k){function l(a,b){var c=b.keys,d={};if(!b.regexp)return null;var e=b.regexp.exec(a);if(!e)return null;for(var f=1,g=e.length;g>f;++f){var h=c[f-1],i="string"==typeof e[f]?decodeURIComponent(e[f]):e[f];h&&i&&(d[h.name]=i)}return d}function m(){var a=n(),d=q.current;a&&d&&a.$$route===d.$$route&&b.equals(a.pathParams,d.pathParams)&&!a.reloadOnSearch&&!p?(d.params=a.params,b.copy(d.params,f),c.$broadcast("$routeUpdate",d)):(a||d)&&(p=!1,c.$broadcast("$routeChangeStart",a,d),q.current=a,a&&a.redirectTo&&(b.isString(a.redirectTo)?e.path(o(a.redirectTo,a.params)).search(a.params).replace():e.url(a.redirectTo(a.pathParams,e.path(),e.search())).replace()),g.when(a).then(function(){if(a){var c,d,e=b.extend({},a.resolve);return b.forEach(e,function(a,c){e[c]=b.isString(a)?h.get(a):h.invoke(a)}),b.isDefined(c=a.template)?b.isFunction(c)&&(c=c(a.params)):b.isDefined(d=a.templateUrl)&&(b.isFunction(d)&&(d=d(a.params)),d=k.getTrustedResourceUrl(d),b.isDefined(d)&&(a.loadedTemplateUrl=d,c=i.get(d,{cache:j}).then(function(a){return a.data}))),b.isDefined(c)&&(e.$template=c),g.all(e)}}).then(function(e){a==q.current&&(a&&(a.locals=e,b.copy(a.params,f)),c.$broadcast("$routeChangeSuccess",a,d))},function(b){a==q.current&&c.$broadcast("$routeChangeError",a,d,b)}))}function n(){var c,f;return b.forEach(d,function(d){!f&&(c=l(e.path(),d))&&(f=a(d,{params:b.extend({},e.search(),c),pathParams:c}),f.$$route=d)}),f||d[null]&&a(d[null],{params:{},pathParams:{}})}function o(a,c){var d=[];return b.forEach((a||"").split(":"),function(a,b){if(0===b)d.push(a);else{var e=a.match(/(\w+)(.*)/),f=e[1];d.push(c[f]),d.push(e[2]||""),delete c[f]}}),d.join("")}var p=!1,q={routes:d,reload:function(){p=!0,c.$evalAsync(m)}};return c.$on("$locationChangeSuccess",m),q}]}function d(){this.$get=function(){return{}}}function e(a,b,c,d,e){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(f,g,h){return function(f,g,i){function j(){l&&(l.$destroy(),l=null),m&&(e.leave(m),m=null)}function k(){var i=a.current&&a.current.locals,k=i&&i.$template;if(k){var o=f.$new();h(o,function(f){j(),f.html(k),e.enter(f,null,g);var h=c(f.contents()),p=a.current;if(l=p.scope=o,m=f,p.controller){i.$scope=l;var q=d(p.controller,i);p.controllerAs&&(l[p.controllerAs]=q),f.data("$ngControllerController",q),f.children().data("$ngControllerController",q)}h(l),l.$emit("$viewContentLoaded"),l.$eval(n),b()})}else j()}var l,m,n=i.onload||"";f.$on("$routeChangeSuccess",k),k()}}}}var f=b.module("ngRoute",["ng"]).provider("$route",c);f.provider("$routeParams",d),f.directive("ngView",e),e.$inject=["$route","$anchorScroll","$compile","$controller","$animate"]}(window,window.angular);var AngularFire;angular.module("firebase",[]).value("Firebase",Firebase),angular.module("firebase").factory("angularFire",["$q","$parse","$timeout",function(a,b,c){return function(d,e,f){var g=new AngularFire(a,b,c,d);return g.associate(e,f)}}]),AngularFire=function(a,b,c,d){if(this._q=a,this._parse=b,this._timeout=c,this._initial=!0,this._remoteValue=!1,"string"==typeof d)throw new Error("Please provide a Firebase reference instead of a URL, eg: new Firebase(url)");this._fRef=d},AngularFire.prototype={associate:function(a,b){var c=this,d=this._q.defer(),e=d.promise;return this._fRef.on("value",function(e){var f=e.val(),g=angular.fromJson(angular.toJson(c._parse(b)(a)));if(c._initial){c._initial=!1;var h=!1,i=Object.prototype.toString;if(f&&i.call(g)==i.call(f))if("[object Array]"==i.call(g))h=g.concat(f),angular.equals(h,f)||(c._fRef.ref().set(h),f=h);else if("[object Object]"==i.call(g)){h=g;for(var j in f)h[j]=f[j];c._fRef.ref().update(h),f=h}null===f&&void 0!==g&&(c._fRef.ref().set(g),f=g)}var k=!1;d&&(k=d,d=!1),c._timeout(function(){c._resolve(a,b,k,f)})}),e},disassociate:function(){var a=this;a._unregister&&a._unregister(),this._fRef.off("value")},_resolve:function(a,b,c,d){var e=this;if(null===d){var f=a[b];if("object"==typeof f){var g=Object.prototype.toString;d=g.call(f)==g.call([])?[]:{}}}this._remoteValue=angular.copy(d),this._parse(b).assign(a,angular.copy(d)),c&&(c.resolve(function(){e.disassociate()}),this._watch(a,b))},_watch:function(a,b){var c=this;c._unregister=a.$watch(b,function(){if(!c._initial){var d=angular.fromJson(angular.toJson(c._parse(b)(a)));if(!angular.equals(d,c._remoteValue)){var e=Object.prototype.toString;"[object Object]"==e.call(d)?c._fRef.set?c._fRef.set(d):c._fRef.ref().update(d):c._fRef.ref().set(d)}}},!0),a.$on("$destroy",function(){c.disassociate()})},_log:function(a){console&&console.log&&console.log(a)}},angular.module("firebase").factory("angularFireCollection",["$timeout",function(a){return function(b,c){function d(a){return a?l[a]+1:0}function e(a,b){l[b.$id]=a,m.splice(a,0,b)}function f(a){var b=l[a];m.splice(b,1),l[a]=void 0}function g(a,b){m[a]=b}function h(a,b,c){m.splice(a,1),m.splice(b,0,c),i(a,b)}function i(a,b){var c=m.length;b=b||c,b>c&&(b=c);for(var d=a;b>d;d++){var e=m[d];e.$index=l[e.$id]=d}}if("string"==typeof b)throw new Error("Please provide a Firebase reference instead of a URL, eg: new Firebase(url)");var j=function(a,b){this.$ref=a.ref(),this.$id=a.name(),this.$index=b,angular.extend(this,{$priority:a.getPriority()},a.val())},k=[function(a){return null==a.$priority?0:angular.isNumber(a.$priority)?1:angular.isString(a.$priority)?2:void 0},function(a){return a.$priority?a.$priority:1/0},function(a){return a.$id}],l={},m=[];return c&&"function"==typeof c&&b.once("value",c),b.on("child_added",function(b,c){a(function(){var a=d(c);e(a,new j(b,a)),i(a)})}),b.on("child_removed",function(b){a(function(){var a=b.name(),c=l[a];f(a),i(c)})}),b.on("child_changed",function(b,c){a(function(){var a=l[b.name()],e=d(c),f=new j(b,a);g(a,f),e!==a&&h(a,e,f)})}),b.on("child_moved",function(b,c){a(function(){var a=l[b.name()],e=d(c),f=m[a];h(a,e,f)})}),m.getByName=function(a){return m[l[a]]},m.getByNames=function(a){for(var b=[],c=0,d=a.length;d>c;c++)b.push(m[l[a[c]]]);return b},m.add=function(a,c){var d,e=angular.fromJson(angular.toJson(a));return d=c?b.ref().push(e,c):b.ref().push(e)},m.remove=function(a,b){var c=angular.isString(a)?m[l[a]]:a;b?c.$ref.remove(b):c.$ref.remove()},m.update=function(a,b){var c=angular.isString(a)?m[l[a]]:a,d=angular.fromJson(angular.toJson(c));b?c.$ref.update(d,b):c.$ref.update(d)},m.set=function(a,b){var c=angular.isString(a)?m[l[a]]:a,d=angular.fromJson(angular.toJson(c));b?c.$ref.set(d,b):c.$ref.set(d)},m.order=k,m}}]),angular.module("firebase").factory("angularFireAuth",["$rootScope","$parse","$timeout","$location","$route","$q",function(a,b,c,d,e,f){function g(a){var b=a.split(".");if(!b instanceof Array||3!==b.length)throw new Error("Invalid JWT");var c=b[1];return window.atob?JSON.parse(decodeURIComponent(escape(window.atob(c)))):a}function h(a,d,e,f){d&&c(function(){b(d).assign(a,e),f()})}function i(a,b,c){a.authRequired&&!c._authenticated&&(c._redirectTo=void 0===a.pathTo?d.path():a.pathTo===b?"/":a.pathTo,d.replace(),d.path(b))}return{initialize:function(b,c){var d=this;if("string"==typeof b)throw new Error("Please provide a Firebase reference instead of a URL, eg: new Firebase(url)");if(c=c||{},this._scope=a,!c.scope)throw new Error("Scope not provided to angularFireAuth!");if(this._scope=c.scope,!c.name)throw new Error("Model name not provided to angularFireAuth!");if(this._name=c.name,this._cb=function(){},c.callback&&"function"==typeof c.callback&&(this._cb=c.callback),this._redirectTo=null,this._authenticated=!1,c.path&&(e.current&&i(e.current,c.path,d),a.$on("$routeChangeStart",function(a,b){i(b,c.path,d)})),this._ref=b,c.simple===!1)return h(this._scope,this._name,null,function(){}),void 0;if(!window.FirebaseSimpleLogin){var f=new Error("FirebaseSimpleLogin undefined, did you include firebase-simple-login.js?");return a.$broadcast("angularFireAuth:error",f),void 0}var g=new FirebaseSimpleLogin(this._ref,function(b,c){d._cb(b,c),b?a.$broadcast("angularFireAuth:error",b):c?d._loggedIn(c):d._loggedOut()});this._authClient=g},login:function(b,c){var d=this._watchForLogin();switch(b){case"github":case"persona":case"twitter":case"facebook":case"password":if(this._authClient)this._authClient.login(b,c);else{var e=new Error("Simple Login not initialized");a.$broadcast("angularFireAuth:error",e)}break;default:var f,h=this;try{f=g(b),this._ref.auth(b,function(b){b?a.$broadcast("angularFireAuth:error",b):h._loggedIn(f)})}catch(i){a.$broadcast("angularFireAuth:error",i)}}return d},createUser:function(b,d,e,f){var g=this;this._authClient.createUser(b,d,function(h,i){try{h?a.$broadcast("angularFireAuth:error",h):f||g.login("password",{email:b,password:d})}catch(j){a.$broadcast("angularFireAuth:error",j)}e&&c(function(){e(h,i)})})},logout:function(){this._authClient?this._authClient.logout():(this._ref.unauth(),this._loggedOut())},_loggedIn:function(b){var c=this;this._authenticated=!0,h(this._scope,this._name,b,function(){a.$broadcast("angularFireAuth:login",b),c._redirectTo&&(d.replace(),d.path(c._redirectTo),c._redirectTo=null)})},_loggedOut:function(){this._authenticated=!1,h(this._scope,this._name,null,function(){a.$broadcast("angularFireAuth:logout")})},_watchForLogin:function(){function b(a,b){c(function(){a?e.reject(a):e.resolve(b)});for(var f=0;f<d.length;f++)d[f]()}var d=[],e=f.defer();return d.push(a.$on("angularFireAuth:login",function(a,c){b(null,c)})),d.push(a.$on("angularFireAuth:error",function(a,c){b(c,null)})),e.promise}}}]);