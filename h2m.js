(function (global) { //브라우저 별 함수가 다를 경우를 지원하기 위한 영역 (MDN polyfill 참조)
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

  if (!Object.keys) {
    Object.keys = (function() {

      var hasOwnProperty = ObjProto.hasOwnProperty,
          hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
          ],
          dontEnumsLength = dontEnums.length;

      return function(obj) {
        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }
        var result = [], prop, i;

        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }

        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }());
  }
})(window);

(function() {
  'use stric';

  var global = this;

  var h2m = {};
  var ArrayProto = Array.prototype,
      ObjProto = Object.prototype;

  // 브라우저 전체에 새로 스크롤 생성여부 체크
  function hasVerticalScroll() {
    return document.body.scrollHeight > window.innerHeight;
  }
  h2m.hasVerticalScroll = hasVerticalScroll;

  function addComma(num) {
    // 가격에 , 붙여서 string형태로 return
    num = '' + num;
    return num.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  }
  function removeComma(str) {
    // 가격에 , 삭제하여 number형태로 return
    str = '' + str;
    return parseInt(str.replace(/,/g,''), 10);
  }
  h2m.addComma = addComma;
  h2m.removeComma = removeComma;

  // 숫자를 제외하고 전부 삭제해서 return
  function leaveOnlyNumber(val) {
    return val.replace(/[^0-9\-]/gi,'');
  }
  h2m.leaveOnlyNumber = leaveOnlyNumber;



  // object의 key 개수
  function objectSize( obj ) {
    return Object.keys(obj).length;
  }
  h2m.objectSize = objectSize;

  function sort(array, order) {
    // compare callback function 기본으로 적용된 sort
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

  function sortObjectByKey( obj, order ) {
    // key값을 기준으로 sort하여 key와 value값을 가진 배열로 리턴
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

  function plunkSelectKey(array, key) {
    // object가 담긴 배열에서 특정 키값의 value를 추출
    var i,
        len = array.length,
        result = [];
    for( i = 0; i < len; i++ ) {
      result.push( array[i][key] );
    }
    return result;
  }
  h2m.plunkSelectKey = plunkSelectKey;

  function arrayMap( array, callback ) {
    // Array객체의 map 메서드 구현
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
    // 배열들의 각 요소들 중 중복 값 배열을 반환
    if( arguments.length < 2 ) {
      throw new TypeError( 'need' + 2 - arguments.length + ' more argument ');
    }
    for( var al = 0; al < arguments.length; al++ ) {
      if( !isArray(arguments[al]) ) {
        throw new TypeError( 'arguments[' + al + '] is not array'  );
      }
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
    // array.prototype.indexOf 기능 함수형태로 구현
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
    // 인자로 받은 배열들 중 length 가 가장 짧은 배열 반환 ( 2개 이상 반환 가능 )
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

  h2m.arrayIntersect = arrayIntersect; // 배열들의 각 요소들 중 중복 값 배열을 반환
  h2m.arrayIndexOf = arrayIndexOf; // array.prototype.indexOf 기능 함수형태로 구현
  h2m.getShortArray = getShortArray; // 인자로 받은 배열들 중 length 가 가장 짧은 배열 반환 ( 2개 이상 반환 가능 )
  h2m.isArray = isArray;





  function platformInfo() {
    // 브라우저 정보 객체를 반환 하는 함수
    var ua = navigator.userAgent.toLowerCase(),
        av = navigator.appVersion,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [],
        isMobile,
        osName = 'Unknown';


    // mobile 체크
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) ) {
      isMobile = true;
    } else {
      isMobile = false;
    }

    // os 체크
    if( !isMobile ) {
      if ( /Win/i.test(av) ) {
        osName = 'Windows';
      }
      if ( /Mac/i.test(av) ) {
        osName = 'MacOS';
      }
      if ( /X11/i.test(av) ) {
        osName = 'UNIX';
      }
      if ( /Linux/i.test(av) ) {
        osName = 'Linux';
      }
    } else {
      if( /Android/i.test(av) ) {
        osName = 'android';
      }
      if( /iPhone|iPad|iPod/i.test(av) ) {
        osName = 'ios';
      }
      if( /BlackBerry/i.test(av) ) {
        osName = 'BlackBerry'
      }
    }

    // ie 체크
    if( /trident/i.test(M[1]) ) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return {
        name : 'IE',
        version : ( tem[1] || '' ),
        isMobile: isMobile,
        os: osName
      };
    }

    // opera 체크
    if(M[1]==='Chrome') {
      tem = ua.match(/\bOPR|Edge\/(\d+)/)
      if( tem != null ) {
        return {
          name : 'Opera',
          version : tem[1],
          isMobile: isMobile,
          os: osName
        };
      }
    }

    M = M[2] ? [M[1], M[2]] : [navigator.appName, av, '-?'];
    if( ( tem = ua.match(/version\/(\d+)/i) ) != null ) {
      M.splice(1,1,tem[1]);
    }

    return {
      name: M[0],
      version: M[1],
      isMobile: isMobile,
      os: osName
    };
  }
  h2m.platform = platformInfo;

  function cookie() {
    function getCookie(cname) {
      var value = '; ' + document.cookie;
      var parts = value.split('; ' + cname + '=');

      if ( parts.length === 2 ) {
        return parts.pop().split(';').shift();
      }
    }
    function setCookie(cname, value, path, days) {
      var date, expires;
      if( days ) {
      	date = new Date();
      	date.setTime(date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
      	expires = '; expires=' + date.toUTCString();
      } else {
      	expires = '';
      }
      document.cookie = cname + '=' + value+expires + ';path=' + path + ';';
    }
    function delCookie(cname, path) {
    	document.cookie = cname + '=;path=' + path + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    return {
      get : getCookie,
      set: setCookie,
      del : delCookie
    }
  }
  h2m.cookie = cookie();

  function queryString() {
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = decodeURIComponent(pair[1]);
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
        query_string[pair[0]] = arr;
      } else {
        query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }
    }
    return query_string;
  }
  h2m.queryString = queryString;
  return global.h2m = h2m;
}.call(this));