// h2mjs
// version : 1.0.0
(function() {
  'use stric';

  this.testObj = {
    data : {
      0 : {
        bName: '미미미123',
        color: {
          boxColor: '#fff',
          lineColor: '#fbfbfb',
          id: 8
        },
        weddingHall: '아스티에'
      },
      1: {
        bName: '가이오낭',
        color: {
          boxColor: '#fcfcfc',
          lineColor: '#aaa',
          id: 12
        },
        weddingHall: '우디홀'
      },
      2: {
        bName: '전근혁',
        color: {
          boxColor: '#fff',
          lineColor: '#fbfbfb',
          id: 6
        },
        weddingHall: '코르비'
      },
      3: {
        bName: '하이홍',
        color: {
          boxColor: '#fff',
          lineColor: '#fbfbfb',
          id: 13
        },
        weddingHall: '세시코'
      },
      4: {
        bName: '주노주노',
        color: {
          boxColor: '#fff',
          lineColor: '#fbfbfb',
          id: 1
        },
        weddingHall: '도아잉ㅇ'
      },
      5: {
        bName: '코에키스',
        color: {
          boxColor: '#fff',
          lineColor: '#fbfbfb',
          id: 4
        },
        weddingHall: '허햐해이멘'
      }
    },
    hallMap : {
      '무슨홀' : {
        id: 153,
        color: '#fbcfdc'
      },
      'afa홀' : {
        id: 12,
        color: '#fbcfdc'
      },
      '카이홀' : {
        id: 168,
        color: '#fbcfdc'
      },
      '제이홀' : {
        id: 445,
        color: '#fbcfdc'
      },
      '프리아미저홀' : {
        id: 53,
        color: '#fbcfdc'
      }
    }
  }



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



  return global.h2m = h2m;
}.call(this));
