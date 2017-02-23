(function (global) { //브라우저 별 함수가 다를 경우를 지원하기 위한 영역
  'use strict';

  var ArrayProto = Array.prototype,
      ObjProto = Object.prototype;

  if (typeof window.console === "undefined" || typeof window.console.log === "undefined") { // ie8 console log 객체 생성 (에러 방지)
    global.console = { log: function () { } };
  }

  if (!ArrayProto.map) {
    ArrayProto.map = function(callback, thisArg) {
      var T, A, k;
      if (this == null) {
        throw new TypeError(' this is null or not defined');
      }
      var O = Object(this);
      var len = O.length >>> 0;
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }

      if (arguments.length > 1) {
        T = thisArg;
      }

      A = new Array(len);

      // 7. Let k be 0
      k = 0;

      while (k < len) {

        var kValue, mappedValue;
        if (k in O) {
          kValue = O[k];
          A[k] = mappedValue;
        }
        k++;
      }
      return A;
    };
  }

  if (!ArrayProto.indexOf) {
    ArrayProto.indexOf = function(searchElement, fromIndex) {

      var k;

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);
      var len = o.length >>> 0;

      if (len === 0) {
        return -1;
      }
      var n = fromIndex | 0;

      if (n >= len) {
        return -1;
      }

      k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 9. k <len 인 동안 반복한다.
      while (k < len) {
        if (k in o && o[k] === searchElement) {
          return k;
        }
        k++;
      }
      return -1;
    };
  }

  if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun/*, thisArg*/) {

      if (this === void 0 || this === null) {
        throw new TypeError();
      }

      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== 'function') {
        throw new TypeError();
      }

      var res = [];
      var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
      for (var i = 0; i < len; i++) {
        if (i in t) {
          var val = t[i];

          // 주의: 기술상 이는 아마 다음 인덱스에서
          //       Object.defineProperty일 것임, push는 Object.prototype
          //       및 Array.prototype 상 속성에 의해 영향을 받을 수 있기에.
          //       그러나 그 메소드는 새롭고 충돌은
          //       드물기에 더 호환되는 대안을 쓰세요.
          if (fun.call(thisArg, val, i, t)) {
            res.push(val);
          }
        }
      }

      return res;
    };
  }

  if (!ArrayProto.filter) {
    ArrayProto.filter = function(fun) {

      if (this === void 0 || this === null) {
        throw new TypeError();
      }

      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== 'function') {
        throw new TypeError();
      }

      var res = [];
      var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
      for (var i = 0; i < len; i++) {
        if (i in t) {
          var val = t[i];

          if (fun.call(thisArg, val, i, t)) {
            res.push(val);
          }
        }
      }

      return res;
    };
  }


})(window);
(function() {
  'use stric';

  var global = this;

  var h2m = {};
  var ArrayProto = Array.prototype,
      ObjProto = Object.prototype;

  // 가격에 , 붙여서 string형태로 return
  function addComma(num) {
    num = '' + num;
    return num.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  }
  // 가격에 , 삭제하여 number형태로 return
  function removeComma(str) {
    str = '' + str;
    return parseInt(str.replace(/,/g,''), 10);
  }
  h2m.addComma = addComma;
  h2m.removeComma = removeComma;

  function onlyNumber(val) {
    return val.replace(/[^0-9\-]/gi,'');
  }
  h2m.onlyNumber = onlyNumber;

  // compare callback function 기본으로 적용된 sort
  function sort(array, order) {
    var fnc = function(a, b) {
      if ( a < b ) {
        return -1;
      }
      if ( a > b ) {
        return 1;
      }
      return 0;
    }
    if( order === 'desc' ) {
      return array.sort( fnc ).reverse();
    } else {
      return array.sort( fnc );
    }
  }
  h2m.sort = sort;

  // key값을 기준으로 sort하여 key와 value값을 가진 배열로 리턴
  function sortObjectByKey( obj, order ) {
    var keys,
        i,
        k,
        len,
        result = [];

    if( typeof Object.keys === 'function' ) {
      keys = Object.keys(obj);
    } else {
      keys = [];
      for( k in obj ) {
        keys.push( k );
      }
    }

    sort( keys, order );
    len = keys.length;
    for( i = 0; i < len; i++ ) {
      result.push( [ keys[i], obj[keys[i]] ] );
    }
    return result;
  }
  h2m.sortObjectByKey = sortObjectByKey;

  // object가 담긴 배열에서 특정 키값의 value를 추출
  function plunkSelectKey(array, key) {
    var i,
        len = array.length,
        result = [];
    for( i = 0; i < len; i++ ) {
      result.push( array[i][key] );
    }
    return result;
  }
  h2m.plunkSelectKey = plunkSelectKey;

  // Array객체의 map 메서드 구현 (ie 미지원으로 인한 문제 해결)
  function arrayMap( array, callback ) {
    if ( typeof callback !== 'function' ) {
      throw new TypeError(callback + 'is not a function or null');
    }
    var i,
        len = array.length,
        result = [],
        currentValue,
        mappedCurrentValue;

    result.length = len;
    for( i = 0; i < len; i++ ) {
      currentValue = array[i];
      mappedCurrentValue = callback.call(this, currentValue, i, array);
      result[i] = mappedCurrentValue;
    }

    return result;
  }
  h2m.arrayMap = arrayMap;

  function arrayIntersect() {
    if( arguments.length < 2 ) {
      throw new TypeError( 'need' + 2 - arguments.length + ' more argument ');
    }

    var i, j,
        shortArray = getShortArray(arguments)[0],
        len = shortArray.length,
        result = [],
        selectedItem,
        chkHaveItem;

    for( i = 0; i < len; i++ ) {
      selectedItem = shortArray[i];
      chkHaveItem = true;
      for( j = 0; j < arguments.length; j++ ) {
        if( arrayIndexOf( arguments[j], selectedItem ) === -1 ) {
          chkHaveItem = false;
          break;
        }
      }
      if( chkHaveItem && arrayIndexOf( result, selectedItem ) === -1 ) {
        result.push( selectedItem );
      }
    }
    return result;
  }
  function arrayIndexOf( array, searchItem, fromIndex ) {
    var i,
        len = array.length;

    i = Math.abs(fromIndex) || 0;
    if( i > len ) {
      return -1;
    }
    for( i; i < len; i++ ) {
      if( searchItem === array[i] && i in array ) {
        return i;
      }
    }
    return -1;
  }
  function getShortArray() {
    if( arguments.length < 2 && !isArray(arguments[0][0]) ) {
      throw new TypeError( 'need' + 2 - arguments.length + ' more argument ');
    }

    var arg;
    if( isArray(arguments[0][0]) ) {
      arg = arrayMap( arguments[0], function(v) {
        return v;
      })
    } else {
      arg = arguments;
    }

    var i,
        len = arg.length,
        tempArray = [],
        cnt = 0,
        currentLength,
        tempArrayLength;

    for( i = 0; i < len; i++ ) {
      tempArrayLength = arg[(tempArray[0] ? tempArray[0] : 0)].length;
      currentLength = arg[i].length;

      if( !cnt || tempArrayLength >= currentLength ) {
        if( tempArrayLength !== currentLength ) {
          tempArray.pop();
        }
        tempArray.push( i );
        cnt++;
      }
    }

    return arrayMap( tempArray, function(v) {
      return arg[v]
    });
  }
  function isArray(array) {
    return Object.prototype.toString.call(array) === '[object Array]';
  }

  h2m.arrayIntersect = arrayIntersect;
  h2m.arrayIndexOf = arrayIndexOf;
  h2m.getShortArray = getShortArray;
  h2m.isArray = isArray;


  return global.h2m = h2m;
}.call(this));
