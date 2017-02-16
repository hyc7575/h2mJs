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

  function sortObjectByKey( obj, order ) {
    var keys,
        i = 0,
        k,
        len,
        result = {};

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
    for( i; i < len; i++ ) {
      result[keys[i]] = obj[keys[i]];
    }
    return result;
  }
  h2m.sortObjectByKey = sortObjectByKey;


  return global.h2m = h2m;
}.call(this));
