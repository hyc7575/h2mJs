!function(t){"use strict";var e=Array.prototype,r=Object.prototype,n=String.prototype,o=location.host,i=Object.assign({},t.console);!function(e){t.console.log=function(t){-1!==o.indexOf("localhost")||-1!==o.indexOf("h2m.io")?e.log(t):e.log("안돼 저리가 쓰지마 콘솔없어")}}(i),void 0!==window.console&&void 0!==window.console.log||(t.console={log:function(){}}),n.trim||(n.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),e.map||(e.map=function(t,e){var r,n;if(null==this)throw new TypeError(" this is null or not defined");var o=Object(this),i=o.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(arguments.length>1&&e,r=new Array(i),n=0;n<i;){n in o&&(o[n],r[n]=void 0),n++}return r}),e.indexOf||(e.indexOf=function(t,e){var r;if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),o=n.length>>>0;if(0===o)return-1;var i=0|e;if(i>=o)return-1;for(r=Math.max(i>=0?i:o-Math.abs(i),0);r<o;){if(r in n&&n[r]===t)return r;r++}return-1}),e.filter||(e.filter=function(t){if(void 0===this||null===this)throw new TypeError;var e=Object(this),r=e.length>>>0;if("function"!=typeof t)throw new TypeError;for(var n=[],o=arguments.length>=2?arguments[1]:void 0,i=0;i<r;i++)if(i in e){var s=e[i];t.call(o,s,i,e)&&n.push(s)}return n}),Object.keys||(Object.keys=function(){var t=r.hasOwnProperty,e=!{toString:null}.propertyIsEnumerable("toString"),n=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],o=n.length;return function(r){if("object"!=typeof r&&("function"!=typeof r||null===r))throw new TypeError("Object.keys called on non-object");var i,s,a=[];for(i in r)t.call(r,i)&&a.push(i);if(e)for(s=0;s<o;s++)t.call(r,n[s])&&a.push(n[s]);return a}}()),Array.prototype.unique=function(){for(var t=this.concat(),e=0;e<t.length;++e)for(var r=e+1;r<t.length;++r)t[e]===t[r]&&t.splice(r--,1);return t},Array.prototype.intersect=function(t){return this.filter(function(e){return-1!==t.indexOf(e)})}}(window),function(){"use stric";function t(){return document.body.scrollHeight>window.innerHeight}function e(t){return t=""+t,t.replace(/(\d)(?=(?:\d{3})+(?!\d))/g,"$1,")}function r(t){return t=""+t,parseInt(t.replace(/,/g,""),10)}function n(t){return t.replace(/[^0-9\-]/gi,"")}function o(t){return Object.keys(t).length}function i(t,e){var r=function(t,e){return t<e?-1:t>e?1:0};return"desc"===e?t.sort(r).reverse():t.sort(r)}function s(t,e){var r,n,o,s,a=[];if("function"==typeof Object.keys)r=Object.keys(t);else{r=[];for(o in t)r.push(o)}for(i(r,e),s=r.length,n=0;n<s;n++)a.push([r[n],t[r[n]]]);return a}function a(t,e){var r,n=t.length,o=[];for(r=0;r<n;r++)o.push(t[r][e]);return o}function c(t,e){if("function"!=typeof e)throw new TypeError(e+"is not a function or null");var r,n,o,i=t.length,s=[];for(s.length=i,r=0;r<i;r++)n=t[r],o=e.call(this,n,r,t),s[r]=o;return s}function l(){if(arguments.length<2)throw new TypeError("need2"-arguments.length+" more argument ");for(var t=0;t<arguments.length;t++)if(!f(arguments[t]))throw new TypeError("arguments["+t+"] is not array");var e,r,n,o,i=h(arguments)[0],s=i.length,a=[];for(e=0;e<s;e++){for(n=i[e],o=!0,r=0;r<arguments.length;r++)if(-1===u(arguments[r],n)){o=!1;break}o&&-1===u(a,n)&&a.push(n)}return a}function u(t,e,r){var n,o=t.length;if((n=Math.abs(r)||0)>o)return-1;for(n;n<o;n++)if(e===t[n]&&n in t)return n;return-1}function h(){if(arguments.length<2&&!f(arguments[0][0]))throw new TypeError("need2"-arguments.length+" more argument ");var t;t=f(arguments[0][0])?c(arguments[0],function(t){return t}):arguments;var e,r,n,o=t.length,i=[],s=0;for(e=0;e<o;e++)n=t[i[0]?i[0]:0].length,r=t[e].length,(!s||n>=r)&&(n!==r&&i.pop(),i.push(e),s++);return c(i,function(e){return t[e]})}function f(t){return"[object Array]"===Object.prototype.toString.call(t)}function p(t){t=t.replace(/[^0-9]/g,"");var e="";return t.length<4?t:t.length<7?(e+=t.substr(0,3),e+="-",e+=t.substr(3)):t.length<11?(e+=t.substr(0,3),e+="-",e+=t.substr(3,3),e+="-",e+=t.substr(6)):(e+=t.substr(0,3),e+="-",e+=t.substr(3,4),e+="-",e+=t.substr(7))}function d(t){return/^(01[016789]{1}|070|02|0[3-9]{1}[0-9]{1})-[0-9]{3,4}-[0-9]{4}$/.test(t)}function y(){var t,e,r=navigator.userAgent.toLowerCase(),n=navigator.appVersion,o=r.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[],i="Unknown";if(e=!!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(r),e?(/Android/i.test(n)&&(i="android"),/iPhone|iPad|iPod/i.test(n)&&(i="ios"),/BlackBerry/i.test(n)&&(i="BlackBerry")):(/Win/i.test(n)&&(i="Windows"),/Mac/i.test(n)&&(i="MacOS"),/X11/i.test(n)&&(i="UNIX"),/Linux/i.test(n)&&(i="Linux")),/trident/i.test(r)){var s;return s=r.indexOf("Trident/7.0")>0?"11":r.indexOf("Trident/6.0")>0?"10":r.indexOf("Trident/5.0")>0?"9":r.indexOf("Trident/4.0")>0?"8":"Unknown",{name:"IE",version:s,isMobile:e,os:i}}return"Chrome"===o[1]&&null!=(t=r.match(/\bOPR|Edge\/(\d+)/))?{name:"Opera",version:t[1],isMobile:e,os:i}:(o=o[2]?[o[1],o[2]]:[navigator.appName,n,"-?"],null!=(t=r.match(/version\/(\d+)/i))&&o.splice(1,1,t[1]),{name:o[0],version:o[1],isMobile:e,os:i})}function g(){for(var t,e={},r=m.location.search.substring(1),n=r.split("&"),t=0;t<n.length;t++){var o=n[t].split("=");if(void 0===e[o[0]])e[o[0]]=o[1];else if("string"==typeof e[o[0]]){var i=[e[o[0]],o[1]];e[o[0]]=i}else e[o[0]].push(o[1])}return e}function v(t){this.name=t.target,this.$layer=$(this.name),this.$closeBtn=this.$layer.find(".layer-close"),this.$todayChkBox=this.$layer.find(".today-chkbox")||void 0,this.isDim=t.isDim||!1,this.$showTrigger=$(t.showTrigger),this.callback=t.callback||{},this.isDim&&!$(".layer-cover").length&&($("body").append('<div class="layer-cover" style="display: none; position: fixed; left: 0; right: 0; top: 0;bottom: 0; background-color: #000; opacity: 0.8; z-index: 9999;"></div>'),this.$dim=$(".layer-cover")),this.$showTrigger.length||1===parseInt(b.cookie.get(this.name),10)||this.show(),this.onEvent()}var m=this,b={};Array.prototype,Object.prototype;return b.hasVerticalScroll=t,b.addComma=e,b.removeComma=r,b.leaveOnlyNumber=n,b.objectSize=o,b.sort=i,b.sortObjectByKey=s,b.plunkSelectKey=a,b.arrayMap=c,b.arrayIntersect=l,b.arrayIndexOf=u,b.getShortArray=h,b.isArray=f,b.autoHypenPhone=p,b.validate={},b.validate.chkPhoneTel=d,b.platform=y,b.cookie=function(){function t(t){var e="; "+document.cookie,r=e.split("; "+t+"=");if(2===r.length)return r.pop().split(";").shift()}function e(t,e,r,n){var o,i;n?(o=new Date,o.setTime(o.getTime()+24*n*60*60*1e3),i="; expires="+o.toUTCString()):i="",document.cookie=t+"="+e+i+";path="+r+";"}function r(t,e){document.cookie=t+"=;path="+e+"; expires=Thu, 01 Jan 1970 00:00:01 GMT;"}return{get:t,set:e,del:r}}(),b.queryString=g,v.prototype.onEvent=function(){var t=this;this.$showTrigger.on("click",function(){t.show()}),this.$closeBtn.on("click",function(e){e.preventDefault(),t.$todayChkBox.prop("checked")&&b.cookie.set(t.name,1,"/",1),t.hide(),t.callback.close()})},v.prototype.offEvent=function(){this.$closeBtn.off("click")},v.prototype.show=function(){this.$layer.show(),this.isDim&&this.$dim.show()},v.prototype.hide=function(){this.$layer.hide(),this.isDim&&this.$dim.hide()},b.LayerPop=v,m.h2m=b}.call(this);
