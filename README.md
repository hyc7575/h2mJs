# 하우투메리 자바스크립트 라이브러리

매우매우매우 초기버전, 그냥 생각나는 기능 추가하는 중

## install
```
npm i h2m-javascript
```
## Polyfill List
- String.prototype.trim
- Array.prototype.map
- Array.prototype.indexOf
- Array.prototype.filter
- Object.keys

## Built-in Object expansion
- Array.prototype.unique
```javascript
var arr = [1,1,2,2,2,2,5];
arr.unique(); // [1,2,5]
```
This function can remove duplicate values

- Array.prototype.intersect
```javascript
var arr = [1,2,3,4,5,6];
arr.intersect([5,6,7,8,9]); // [5,6];
```
ps - only one parameter can be received, Multiple parameters are available in Array util

## String Util

- addComma & removeComma
```javascript
// @params {string|number}
var price = h2m.string.addComma(175000); // 175,000
var num = h2m.string.removeComma(price); // 175000
```

- leaveOnlyNumber
```javascript
var number = h2m.string.leaveOnlyNumber('ab1cd2ef3gh4') // 1234
```

- chkPhoneTel
```javascript
h2m.string.chkPhoneTel('010-1234-5678'); // true
h2m.string.chkPhoneTel('019-123-4567'); // true
h2m.string.chkPhoneTel('031-123-4567'); // true
h2m.string.chkPhoneTel('02-1234-5678'); // true
h2m.string.chkPhoneTel('070-1234-5678'); // true
```

- escapeHtml
```javascript
/**
 * entity
 * ----------------------------
 *      & : '&amp;'
 *      < : '&lt;'
 *      > : '&gt;'
 *      " : '&quot;'
 *      ' : '&#39;'
 *      / : '&#x2F;'
 *      ` : '&#x60;'
 *      = : '&#x3D;'
 * ----------------------------
 */
h2m.string.escapeHtml('<div class="intro">안녕</div>'); // "&lt;div class&#x3D;&quot;intro&quot;&gt;안녕&lt;&#x2F;div&gt;"
```

- queryString
```javascript
// If the url is http://example.com?name=hyeok&age=20
var queryStringObj = h2m.string.queryString(); // { name: 'hyeok', age: '20' }
```


## Platform-info Util

Platform-info Util has one function. This is the jsdoc of platform-info Util
```javascript
/**
 * @typedef platform
 * @type {Object}
 * @property {string} name  name of browser
 * @property {string} ver  version of browser
 * @property {boolean} isMobile check if it's mobile or not
 * @property {string} os name of os
 */

/**
 * @description return objects such as browser information, os information
 * @return {platform}
 */

 // Usage
 var platform = h2m.platform(); // return example, {name: "chrome", version: "58", isMobile: false, os: "MacOS"}
```
ps - can detect IE 8+


## Cookie Util
```javascript
var cookieFnc = h2m.cookie;
// set( cname, value, path, expireDays )
cookieFnc.set('cookieName', 'value', '/', 1);
cookieFnc.get('cookieName');
cookieFnc.del('cookieName', '/');
```

---

Readme is still working
