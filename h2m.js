// h2mjs
// version : 1.0.0

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
  // value값을 기준으로 sort하여 key와 value값을 가진 배열로 리턴
  function sortObjectByValue( obj, order ) {
    var sortArray = [],
        result = {},
        k, i;
    for (k in obj) {
      sortArray.push( [k, obj[k]] );
    }

    sortArray.sort(function(a, b) {
      if( a[1] < b[1] ) {
        return -1;
      }
      if( a[1] > b[1] ) {
        return 1;
      }
      return 0;
    });

    if( order === 'desc' ) {
      return sortArray.reverse();
    } else {
      return sortArray;
    }

  }
  h2m.sortObjectByKey = sortObjectByKey;
  h2m.sortObjectByValue = sortObjectByValue;





  return global.h2m = h2m;
}.call(this));
