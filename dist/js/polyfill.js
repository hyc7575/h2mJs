!function(t){"use strict";var r=Array.prototype,n=Object.prototype,o=String.prototype,e=location.host,i=Object.assign({},t.console);!function(r){t.console.log=function(t){-1!==e.indexOf("localhost")||-1!==e.indexOf("h2m.io")?r.log(t):r.log("안돼 저리가 쓰지마 콘솔없어")}}(i),void 0!==window.console&&void 0!==window.console.log||(t.console={log:function(){}}),o.trim||(o.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),r.map||(r.map=function(t,r){var n,o;if(null==this)throw new TypeError(" this is null or not defined");var e=Object(this),i=e.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(arguments.length>1&&r,n=new Array(i),o=0;o<i;){o in e&&(e[o],n[o]=void 0),o++}return n}),r.indexOf||(r.indexOf=function(t,r){var n;if(null==this)throw new TypeError('"this" is null or not defined');var o=Object(this),e=o.length>>>0;if(0===e)return-1;var i=0|r;if(i>=e)return-1;for(n=Math.max(i>=0?i:e-Math.abs(i),0);n<e;){if(n in o&&o[n]===t)return n;n++}return-1}),r.filter||(r.filter=function(t){if(void 0===this||null===this)throw new TypeError;var r=Object(this),n=r.length>>>0;if("function"!=typeof t)throw new TypeError;for(var o=[],e=arguments.length>=2?arguments[1]:void 0,i=0;i<n;i++)if(i in r){var l=r[i];t.call(e,l,i,r)&&o.push(l)}return o}),Object.keys||(Object.keys=function(){var t=n.hasOwnProperty,r=!{toString:null}.propertyIsEnumerable("toString"),o=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],e=o.length;return function(n){if("object"!=typeof n&&("function"!=typeof n||null===n))throw new TypeError("Object.keys called on non-object");var i,l,f=[];for(i in n)t.call(n,i)&&f.push(i);if(r)for(l=0;l<e;l++)t.call(n,o[l])&&f.push(o[l]);return f}}()),Array.prototype.unique=function(){for(var t=this.concat(),r=0;r<t.length;++r)for(var n=r+1;n<t.length;++n)t[r]===t[n]&&t.splice(n--,1);return t},Array.prototype.intersect=function(t){return this.filter(function(r){return-1!==t.indexOf(r)})}}(window);