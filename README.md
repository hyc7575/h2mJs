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
- Object.assign

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

## console
- consoleOnlyLocal
```javascript
console.log(1000); // 1000
h2m.consoleOnlyLocal(); // console -> Object {log: function}
// If not localhost
console.log(1000); // console use only localhost
console.log('abcd'); // console use only localhost
// If localhost
console.log(1000); // 1000
```


## String Util

- addComma & removeComma
```javascript
// @params {string|number}
var price = h2m.string.addComma(175000); // 175,000
var num = h2m.string.removeComma(price); // 175000
```

- leaveOnlyNumber
```javascript
/**
 * @params {string} val - target value
 * @params {string} except - except value, can leave other string
 */
var number = h2m.string.leaveOnlyNumber('ab1cd2ef3gh4'); // 1234
var number2 = h2m.string.leaveOnlyNumber('ab1-cd2-ef3-gh4', '-ef'); // 1-2-ef3-4
```

- autoHypenPhone
```javascript
/**
 * @params {string} val target value
 */
var number = h2m.string.autoHypenPhone('01012345678'); // 010-1234-5678
var number2 = h2m.string.autoHypenPhone('0104567890'); // 010-456-7890

// key event
document.getElementById('myInput').onkeyup = function() {
    this.value = h2m.string.autoHypenPhone( this.value );
}
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

syntax : h2m.string.escapeHtml(str[,arr]);
```javascript
/**
 * entities
 * ----------------------------
 *     & : '&amp;',
 *     < : '&lt;',
 *     > : '&gt;',
 *     " : '&quot;',
 *     ' : '&#39;',
 *     / : '&#47;',
 *     ` : '&#96;',
 *     = : '&#61;'
 * ----------------------------
 */
h2m.string.escapeHtml('<div class="intro">안녕</div>'); // "&lt;div class&#x3D;&quot;intro&quot;&gt;안녕&lt;&#x2F;div&gt;"
h2m.string.escapeHtml('<div class="intro">안녕</div>', []); // "<div class="intro">안녕</div>"
h2m.string.escapeHtml('<div class="intro">안녕</div>', ['<','>','/']); // "&lt;div class="intro"&gt;안녕&lt;&#47;div&gt;"
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

## Array & Object Util
- sortObjectByKey
```javascript
h2m.obj.sortObjectByKey({
	canada: 'some value',
	spain: 'some value',
	korea: 'some value!',
	angola: 'some value'
});
// return [ ['angola', 'some value'], ['canada', 'some value'], ['korea', 'some value!'], ['spain', 'some value'] ]
```

- plunkSelectKey
```javascript
h2m.array.plunkSelectKey( [ {name: 'hyeok'}, {name: 'jason', age: 22}, {age: 20}  ], 'name' ); // ['hyeok', 'jason', undefined]
h2m.array.plunkSelectKey( [ {name: 'hyeok'}, {name: 'jason', age: 22}, {age: 20}  ], 'age' ); // [undefined, 22, 20]
```

- arrayMap
```javascript
var arr = [1, 4, 9];
h2m.array.arrayMap(arr, Math.sqrt); // [1, 2, 3]
console.log(arr); // [1, 4, 9]
h2m.array.arrayMap(arr, function(v, i, array) {
	// v: currentValue, i : index, array: original array
	return v * v;
}); // [1, 16, 81]
　
var kvArray = [{key:1, value:10}, {key:2, value:20}, {key:3, value: 30}];
h2m.array.arrayMap(kvArray, function(obj){
   var rObj = {};
   rObj[obj.key] = obj.value;
   return rObj;
}); // [{1: 10}, {2: 20}, {3: 30}]
```
same as Array.prototype.map

- arrayIntersect
```javascript
var a = [1, 2, 3, 4, 5];
var b = [3, 4, 7, 9];
var c = [3, 4, 5, 6, 7];
h2m.array.arrayIntersect(a, b, c); // [3, 4]
var d = [1, 4, 9, 16];
h2m.array.arrayIntersect(a, b, c, d); // [4]
```
---

Readme is still working
