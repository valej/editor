!function(a,b,c){"use strict";b.module("ngAnimate",["ng"]).config(["$provide","$animateProvider",function(d,e){var f=b.noop,g=b.forEach,h=e.$$selectors,i="$$ngAnimateState",j="ng-animate",k={running:!0};d.decorator("$animate",["$delegate","$injector","$sniffer","$rootElement","$timeout","$rootScope",function(a,c,d,e,l,m){function n(a){if(a){var b=[],e={},f=a.substr(1).split(".");(d.transitions||d.animations)&&f.push("");for(var g=0;g<f.length;g++){var i=f[g],j=h[i];j&&!e[i]&&(b.push(c.get(j)),e[i]=!0)}return b}}function o(a,b,c,d,e,h){function k(a){s[a].done=!0,(s[a].endFn||f)();for(var b=0;b<s.length;b++)if(!s[b].done)return;m()}function m(){if(!m.hasBeenRun){m.hasBeenRun=!0;var a=c.data(i);a&&(v?r(c):(a.flagTimer=l(function(){r(c)},0,!1),c.data(i,a))),(h||f)()}}var o=(c.attr("class")||"")+" "+b,p=(" "+o).replace(/\s+/g,"."),s=[];g(n(p),function(b){s.push({start:b[a]})}),d||(d=e?e.parent():c.parent());var t={running:!0};if((d.inheritedData(i)||t).running||0==s.length)return m(),void 0;var u=c.data(i)||{},v="addClass"==a||"removeClass"==a;if(u.running){if(v&&u.structural)return h&&h(),void 0;l.cancel(u.flagTimer),q(u.animations),(u.done||f)()}c.data(i,{running:!0,structural:!v,animations:s,done:m}),c.addClass(j),g(s,function(a,d){var e=function(){k(d)};a.start?a.endFn=v?a.start(c,b,e):a.start(c,e):e()})}function p(a){b.forEach(a[0].querySelectorAll("."+j),function(a){a=b.element(a);var c=a.data(i);c&&(q(c.animations),r(a))})}function q(a){var b=!0;g(a,function(a){(a.endFn||f)(b)})}function r(a){a.removeClass(j),a.removeData(i)}return e.data(i,k),{enter:function(b,c,d,e){this.enabled(!1,b),a.enter(b,c,d),m.$$postDigest(function(){o("enter","ng-enter",b,c,d,function(){e&&l(e,0,!1)})})},leave:function(b,c){p(b),this.enabled(!1,b),m.$$postDigest(function(){o("leave","ng-leave",b,null,null,function(){a.leave(b,c)})})},move:function(b,c,d,e){p(b),this.enabled(!1,b),a.move(b,c,d),m.$$postDigest(function(){o("move","ng-move",b,null,null,function(){e&&l(e,0,!1)})})},addClass:function(b,c,d){o("addClass",c,b,null,null,function(){a.addClass(b,c,d)})},removeClass:function(b,c,d){o("removeClass",c,b,null,null,function(){a.removeClass(b,c,d)})},enabled:function(a,b){switch(arguments.length){case 2:if(a)r(b);else{var c=b.data(i)||{};c.structural=!0,c.running=!0,b.data(i,c)}break;case 1:k.running=!a;break;default:a=!k.running}return!!a}}}]),e.register("",["$window","$sniffer","$timeout",function(d,e,f){function g(a){A.push(a),f.cancel(r),r=f(function(){b.forEach(A,function(a){a()}),A=[],r=null,y={}},10,!1)}function h(a,b,c){var e=y[b];if(!e){var f=0,g=0,h=0,j=0;q(a,function(a){if(a.nodeType==w){var b=d.getComputedStyle(a)||{};if(f=Math.max(i(b[m+s]),f),!c){g=Math.max(i(b[m+u]),g),j=Math.max(i(b[o+u]),j);var e=i(b[o+s]);e>0&&(e*=parseInt(b[o+v])||1),h=Math.max(e,h)}}}),e={transitionDelay:g,animationDelay:j,transitionDuration:f,animationDuration:h},y[b]=e}return e}function i(a){var c=0,d=b.isString(a)?a.split(/\s*,\s*/):[];return q(d,function(a){c=Math.max(parseFloat(a)||0,c)}),c}function j(a){var b=a.parent(),c=b.data(x);return c||(b.data(x,++z),c=z),c+"-"+a[0].className}function k(a,b,c){function d(a){a.stopPropagation();var b=a.originalEvent||a,d=b.$manualTimeStamp||b.timeStamp||Date.now();Math.max(d-l,0)>=k&&b.elapsedTime>=i&&c()}var e=j(a);if(h(a,e,!0).transitionDuration>0)return c(),void 0;a.addClass(b);var f=h(a,e+" "+b),i=Math.max(f.transitionDuration,f.animationDuration);if(i>0){var k=1e3*Math.max(f.transitionDelay,f.animationDelay),l=Date.now(),o=a[0];f.transitionDuration>0&&(o.style[m+t]="none");var r="";q(b.split(" "),function(a,b){r+=(b>0?" ":"")+a+"-active"});var s=p+" "+n;return g(function(){f.transitionDuration>0&&(o.style[m+t]=""),a.addClass(r)}),a.on(s,d),function(e){a.off(s,d),a.removeClass(b),a.removeClass(r),e&&c()}}a.removeClass(b),c()}function l(a,c){var d="";return a=b.isArray(a)?a:a.split(/\s+/),q(a,function(a,b){a&&a.length>0&&(d+=(b>0?" ":"")+a+c)}),d}var m,n,o,p,q=b.forEach;a.ontransitionend===c&&a.onwebkittransitionend!==c?(m="WebkitTransition",n="webkitTransitionEnd transitionend"):(m="transition",n="transitionend"),a.onanimationend===c&&a.onwebkitanimationend!==c?(o="WebkitAnimation",p="webkitAnimationEnd animationend"):(o="animation",p="animationend");var r,s="Duration",t="Property",u="Delay",v="IterationCount",w=1,x="$ngAnimateKey",y={},z=0,A=[];return{enter:function(a,b){return k(a,"ng-enter",b)},leave:function(a,b){return k(a,"ng-leave",b)},move:function(a,b){return k(a,"ng-move",b)},addClass:function(a,b,c){return k(a,l(b,"-add"),c)},removeClass:function(a,b,c){return k(a,l(b,"-remove"),c)}}}])}])}(window,window.angular),function(a,b){"use strict";function c(){function a(a,c){return b.extend(new(b.extend(function(){},{prototype:a})),c)}function c(a,b){var c=b.caseInsensitiveMatch,d={originalPath:a,regexp:a},e=d.keys=[];return a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?|\*])?/g,function(a,b,c,d){var f="?"===d?d:null,g="*"===d?d:null;return e.push({name:c,optional:!!f}),b=b||"",""+(f?"":b)+"(?:"+(f?b:"")+(g&&"(.+?)"||"([^/]+)")+(f||"")+")"+(f||"")}).replace(/([\/$\*])/g,"\\$1"),d.regexp=new RegExp("^"+a+"$",c?"i":""),d}var d={};this.when=function(a,e){if(d[a]=b.extend({reloadOnSearch:!0},e,a&&c(a,e)),a){var f="/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";d[f]=b.extend({redirectTo:a},c(f,e))}return this},this.otherwise=function(a){return this.when(null,a),this},this.$get=["$rootScope","$location","$routeParams","$q","$injector","$http","$templateCache","$sce",function(c,e,f,g,h,i,j,k){function l(a,b){var c=b.keys,d={};if(!b.regexp)return null;var e=b.regexp.exec(a);if(!e)return null;for(var f=1,g=e.length;g>f;++f){var h=c[f-1],i="string"==typeof e[f]?decodeURIComponent(e[f]):e[f];h&&i&&(d[h.name]=i)}return d}function m(){var a=n(),d=q.current;a&&d&&a.$$route===d.$$route&&b.equals(a.pathParams,d.pathParams)&&!a.reloadOnSearch&&!p?(d.params=a.params,b.copy(d.params,f),c.$broadcast("$routeUpdate",d)):(a||d)&&(p=!1,c.$broadcast("$routeChangeStart",a,d),q.current=a,a&&a.redirectTo&&(b.isString(a.redirectTo)?e.path(o(a.redirectTo,a.params)).search(a.params).replace():e.url(a.redirectTo(a.pathParams,e.path(),e.search())).replace()),g.when(a).then(function(){if(a){var c,d,e=b.extend({},a.resolve);return b.forEach(e,function(a,c){e[c]=b.isString(a)?h.get(a):h.invoke(a)}),b.isDefined(c=a.template)?b.isFunction(c)&&(c=c(a.params)):b.isDefined(d=a.templateUrl)&&(b.isFunction(d)&&(d=d(a.params)),d=k.getTrustedResourceUrl(d),b.isDefined(d)&&(a.loadedTemplateUrl=d,c=i.get(d,{cache:j}).then(function(a){return a.data}))),b.isDefined(c)&&(e.$template=c),g.all(e)}}).then(function(e){a==q.current&&(a&&(a.locals=e,b.copy(a.params,f)),c.$broadcast("$routeChangeSuccess",a,d))},function(b){a==q.current&&c.$broadcast("$routeChangeError",a,d,b)}))}function n(){var c,f;return b.forEach(d,function(d){!f&&(c=l(e.path(),d))&&(f=a(d,{params:b.extend({},e.search(),c),pathParams:c}),f.$$route=d)}),f||d[null]&&a(d[null],{params:{},pathParams:{}})}function o(a,c){var d=[];return b.forEach((a||"").split(":"),function(a,b){if(0===b)d.push(a);else{var e=a.match(/(\w+)(.*)/),f=e[1];d.push(c[f]),d.push(e[2]||""),delete c[f]}}),d.join("")}var p=!1,q={routes:d,reload:function(){p=!0,c.$evalAsync(m)}};return c.$on("$locationChangeSuccess",m),q}]}function d(){this.$get=function(){return{}}}function e(a,b,c,d,e){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(f,g,h){return function(f,g,i){function j(){l&&(l.$destroy(),l=null),m&&(e.leave(m),m=null)}function k(){var i=a.current&&a.current.locals,k=i&&i.$template;if(k){var o=f.$new();h(o,function(f){j(),f.html(k),e.enter(f,null,g);var h=c(f.contents()),p=a.current;if(l=p.scope=o,m=f,p.controller){i.$scope=l;var q=d(p.controller,i);p.controllerAs&&(l[p.controllerAs]=q),f.data("$ngControllerController",q),f.children().data("$ngControllerController",q)}h(l),l.$emit("$viewContentLoaded"),l.$eval(n),b()})}else j()}var l,m,n=i.onload||"";f.$on("$routeChangeSuccess",k),k()}}}}var f=b.module("ngRoute",["ng"]).provider("$route",c);f.provider("$routeParams",d),f.directive("ngView",e),e.$inject=["$route","$anchorScroll","$compile","$controller","$animate"]}(window,window.angular),function(a,b,c){"use strict";var d=b.$$minErr("$resource");b.module("ngResource",["ng"]).factory("$resource",["$http","$parse","$q",function(a,e,f){function g(a){return h(a,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function h(a,b){return encodeURIComponent(a).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,b?"%20":"+")}function i(a,b){this.template=a,this.defaults=b||{},this.urlParams={}}function j(e,g,h){function r(a,b){var c={};return b=n({},g,b),m(b,function(b,d){p(b)&&(b=b()),c[d]=b&&b.charAt&&"@"==b.charAt(0)?q(a,b.substr(1)):b}),c}function s(a){return a.resource}function t(a){o(a||{},this)}var u=new i(e);return h=n({},k,h),m(h,function(e,g){var h=/^(POST|PUT|PATCH)$/i.test(e.method);t[g]=function(g,i,j,k){var q,v,w,x={};switch(arguments.length){case 4:w=k,v=j;case 3:case 2:if(!p(i)){x=g,q=i,v=j;break}if(p(g)){v=g,w=i;break}v=i,w=j;case 1:p(g)?v=g:h?q=g:x=g;break;case 0:break;default:throw d("badargs","Expected up to 4 arguments [params, data, success, error], got {0} arguments",arguments.length)}var y=q instanceof t,z=y?q:e.isArray?[]:new t(q),A={},B=e.interceptor&&e.interceptor.response||s,C=e.interceptor&&e.interceptor.responseError||c;m(e,function(a,b){"params"!=b&&"isArray"!=b&&"interceptor"!=b&&(A[b]=o(a))}),h&&(A.data=q),u.setUrlParams(A,n({},r(q,e.params||{}),x),e.url);var D=a(A).then(function(a){var c=a.data,f=z.$promise;if(c){if(b.isArray(c)!=!!e.isArray)throw d("badcfg","Error in resource configuration. Expected response to contain an {0} but got an {1}",e.isArray?"array":"object",b.isArray(c)?"array":"object");e.isArray?(z.length=0,m(c,function(a){z.push(new t(a))})):(o(c,z),z.$promise=f)}return z.$resolved=!0,a.resource=z,a},function(a){return z.$resolved=!0,(w||l)(a),f.reject(a)});return D=D.then(function(a){var b=B(a);return(v||l)(b,a.headers),b},C),y?D:(z.$promise=D,z.$resolved=!1,z)},t.prototype["$"+g]=function(a,b,c){p(a)&&(c=b,b=a,a={});var d=t[g](a,this,b,c);return d.$promise||d}}),t.bind=function(a){return j(e,n({},g,a),h)},t}var k={get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}},l=b.noop,m=b.forEach,n=b.extend,o=b.copy,p=b.isFunction,q=function(a,b){return e(b)(a)};return i.prototype={setUrlParams:function(a,c,e){var f,h,i=this,j=e||i.template,k=i.urlParams={};m(j.split(/\W/),function(a){if("hasOwnProperty"===a)throw d("badname","hasOwnProperty is not a valid parameter name.");!new RegExp("^\\d+$").test(a)&&a&&new RegExp("(^|[^\\\\]):"+a+"(\\W|$)").test(j)&&(k[a]=!0)}),j=j.replace(/\\:/g,":"),c=c||{},m(i.urlParams,function(a,d){f=c.hasOwnProperty(d)?c[d]:i.defaults[d],b.isDefined(f)&&null!==f?(h=g(f),j=j.replace(new RegExp(":"+d+"(\\W|$)","g"),h+"$1")):j=j.replace(new RegExp("(/?):"+d+"(\\W|$)","g"),function(a,b,c){return"/"==c.charAt(0)?c:b+c})}),j=j.replace(/\/+$/,""),j=j.replace(/\/\.(?=\w+($|\?))/,"."),a.url=j.replace(/\/\\\./,"/."),m(c,function(b,c){i.urlParams[c]||(a.params=a.params||{},a.params[c]=b)})}},j}])}(window,window.angular),function(a,b,c){"use strict";b.module("ngCookies",["ng"]).factory("$cookies",["$rootScope","$browser",function(a,d){function e(){var a,e,f,i;for(a in h)k(g[a])&&d.cookies(a,c);for(a in g)e=g[a],b.isString(e)?e!==h[a]&&(d.cookies(a,e),i=!0):b.isDefined(h[a])?g[a]=h[a]:delete g[a];if(i){i=!1,f=d.cookies();for(a in g)g[a]!==f[a]&&(k(f[a])?delete g[a]:g[a]=f[a],i=!0)}}var f,g={},h={},i=!1,j=b.copy,k=b.isUndefined;return d.addPollFn(function(){var b=d.cookies();f!=b&&(f=b,j(b,h),j(b,g),i&&a.$apply())})(),i=!0,a.$watch(e),g}]).factory("$cookieStore",["$cookies",function(a){return{get:function(c){var d=a[c];return d?b.fromJson(d):d},put:function(c,d){a[c]=b.toJson(d)},remove:function(b){delete a[b]}}}])}(window,window.angular),function(a,b){"use strict";function c(a){var b,c={},d=a.split(",");for(b=0;b<d.length;b++)c[d[b]]=!0;return c}function d(a,c){function d(a,d,g,h){if(d=b.lowercase(d),x[d])for(;s.last()&&y[s.last()];)f("",s.last());w[d]&&s.last()==d&&f("",d),h=t[d]||!!h,h||s.push(d);var i={};g.replace(l,function(a,b,c,d,f){var g=c||d||f||"";i[b]=e(g)}),c.start&&c.start(d,i,h)}function f(a,d){var e,f=0;if(d=b.lowercase(d))for(f=s.length-1;f>=0&&s[f]!=d;f--);if(f>=0){for(e=s.length-1;e>=f;e--)c.end&&c.end(s[e]);s.length=f}}var g,i,r,s=[],u=a;for(s.last=function(){return s[s.length-1]};a;){if(i=!0,s.last()&&z[s.last()])a=a.replace(new RegExp("(.*)<\\s*\\/\\s*"+s.last()+"[^>]*>","i"),function(a,b){return b=b.replace(o,"$1").replace(q,"$1"),c.chars&&c.chars(e(b)),""}),f("",s.last());else if(0===a.indexOf("<!--")?(g=a.indexOf("--",4),g>=0&&a.lastIndexOf("-->",g)===g&&(c.comment&&c.comment(a.substring(4,g)),a=a.substring(g+3),i=!1)):p.test(a)?(r=a.match(p),r&&(a=a.replace(r[0],""),i=!1)):n.test(a)?(r=a.match(k),r&&(a=a.substring(r[0].length),r[0].replace(k,f),i=!1)):m.test(a)&&(r=a.match(j),r&&(a=a.substring(r[0].length),r[0].replace(j,d),i=!1)),i){g=a.indexOf("<");var v=0>g?a:a.substring(0,g);a=0>g?"":a.substring(g),c.chars&&c.chars(e(v))}if(a==u)throw h("badparse","The sanitizer was unable to parse the following block of html: {0}",a);u=a}f()}function e(a){return D.innerHTML=a.replace(/</g,"&lt;"),D.innerText||D.textContent||""}function f(a){return a.replace(/&/g,"&amp;").replace(s,function(a){return"&#"+a.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function g(a){var c=!1,d=b.bind(a,a.push);return{start:function(a,e,g){a=b.lowercase(a),!c&&z[a]&&(c=a),c||1!=A[a]||(d("<"),d(a),b.forEach(e,function(a,c){var e=b.lowercase(c);1!=C[e]||B[e]===!0&&!a.match(r)||(d(" "),d(c),d('="'),d(f(a)),d('"'))}),d(g?"/>":">"))},end:function(a){a=b.lowercase(a),c||1!=A[a]||(d("</"),d(a),d(">")),a==c&&(c=!1)},chars:function(a){c||d(f(a))}}}var h=b.$$minErr("$sanitize"),i=function(a){var b=[];return d(a,g(b)),b.join("")},j=/^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/,k=/^<\s*\/\s*([\w:-]+)[^>]*>/,l=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,m=/^</,n=/^<\s*\//,o=/<!--(.*?)-->/g,p=/<!DOCTYPE([^>]*?)>/i,q=/<!\[CDATA\[(.*?)]]>/g,r=/^((ftp|https?):\/\/|mailto:|tel:|#)/i,s=/([^\#-~| |!])/g,t=c("area,br,col,hr,img,wbr"),u=c("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),v=c("rp,rt"),w=b.extend({},v,u),x=b.extend({},u,c("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),y=b.extend({},v,c("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),z=c("script,style"),A=b.extend({},t,x,y,w),B=c("background,cite,href,longdesc,src,usemap"),C=b.extend({},B,c("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,span,start,summary,target,title,type,valign,value,vspace,width")),D=document.createElement("pre");b.module("ngSanitize",[]).value("$sanitize",i),b.module("ngSanitize").filter("linky",function(){var a=/((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s\.\;\,\(\)\{\}\<\>]/,c=/^mailto:/;return function(d,e){if(!d)return d;var f,h,i,j=d,k=[],l=g(k),m={};for(b.isDefined(e)&&(m.target=e);f=j.match(a);)h=f[0],f[2]==f[3]&&(h="mailto:"+h),i=f.index,l.chars(j.substr(0,i)),m.href=h,l.start("a",m),l.chars(f[0].replace(c,"")),l.end("a"),j=j.substring(i+f[0].length);return l.chars(j),k.join("")}})}(window,window.angular),angular.module("ui.codemirror",[]).constant("uiCodemirrorConfig",{}).directive("uiCodemirror",["uiCodemirrorConfig","$timeout",function(a,b){"use strict";var c=["cursorActivity","viewportChange","gutterClick","focus","blur","scroll","update"];return{restrict:"A",require:"ngModel",link:function(d,e,f,g){var h,i,j,k,l;if("textarea"!==e[0].type)throw new Error("uiCodemirror3 can only be applied to a textarea element");h=a.codemirror||{},i=angular.extend({},h,d.$eval(f.uiCodemirror)),j=function(a){return function(b,c){var e=b.getValue();e!==g.$viewValue&&g.$setViewValue(e),"function"==typeof a&&a(b,c),d.$$phase||d.$apply()}},k=function(){l=CodeMirror.fromTextArea(e[0],i),angular.isDefined(d[f.uiCodemirror])&&d.$watch(f.uiCodemirror,function(a){for(var b in a)a.hasOwnProperty(b)&&l.setOption(b,a[b])},!0),l.on("change",j(i.onChange));for(var a,h=0,k=c.length;k>h;++h)a=i["on"+c[h].charAt(0).toUpperCase()+c[h].slice(1)],void 0!==a&&"function"==typeof a&&l.on(c[h],a);g.$formatters.push(function(a){if(angular.isUndefined(a)||null===a)return"";if(angular.isObject(a)||angular.isArray(a))throw new Error("ui-codemirror cannot use an object or an array as a model");return a}),g.$render=function(){l.setValue(g.$viewValue)},g.$viewValue||(g.$setViewValue(e.text()),g.$render()),f.uiRefresh&&d.$watch(f.uiRefresh,function(a,c){a!==c&&b(function(){l.refresh()})}),angular.isFunction(i.onLoad)&&i.onLoad(l)},b(k)}}}]);