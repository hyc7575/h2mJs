(function() {
    'use stric';

    var global = this;

    var array = {};
	var obj = {};
    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype;

    //object
    function sortObjectByKey(obj, order) {
        // key값을 기준으로 sort하여 key와 value값을 가진 배열로 리턴
        var keys,
            i,
            k,
            len,
            result = [];

        if (typeof Object.keys === 'function') {
            keys = Object.keys(obj);
        } else {
            keys = [];
            for (k in obj) {
                keys.push(k);
            }
        }

        sort(keys, order);
        len = keys.length;
        for (i = 0; i < len; i++) {
            result.push([keys[i], obj[keys[i]]]);
        }
        return result;
    }
    obj.sortObjectByKey = sortObjectByKey;


    //array
    function sort(array, order) {
        // compare callback function 기본으로 적용된 sort
        var fnc = function(a, b) {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        }
        if (order === 'desc') {
            return array.sort(fnc).reverse();
        } else {
            return array.sort(fnc);
        }
    }
    array.sort = sort;

    function plunkSelectKey(array, key) {
        // object가 담긴 배열에서 특정 키값의 value를 추출
        var i,
            len = array.length,
            result = [];
        for (i = 0; i < len; i++) {
            result.push(array[i][key]);
        }
        return result;
    }
    array.plunkSelectKey = plunkSelectKey;

    function arrayMap(array, callback) {
        // Array객체의 map 메서드 구현
        if (typeof callback !== 'function') {
            throw new TypeError(callback + 'is not a function or null');
        }
        var i,
            len = array.length,
            result = [],
            currentValue,
            mappedCurrentValue;

        result.length = len;
        for (i = 0; i < len; i++) {
            currentValue = array[i];
            mappedCurrentValue = callback.call(this, currentValue, i, array);
            result[i] = mappedCurrentValue;
        }

        return result;
    }
    array.arrayMap = arrayMap;

    function arrayIntersect() {
        // 배열들의 각 요소들 중 중복 값 배열을 반환
        if (arguments.length < 2) {
            throw new TypeError('need' + 2 - arguments.length + ' more argument ');
        }
        for (var al = 0; al < arguments.length; al++) {
            if (!isArray(arguments[al])) {
                throw new TypeError('arguments[' + al + '] is not array');
            }
        }
		var arrs = ArrayProto.slice.call(arguments);
		var result = arrs.shift().filter(function(v) {
			return arrs.every(function(a) {
				return a.indexOf(v) !== -1;
			});
		});
		return result;
    }

    function arrayIndexOf(array, searchItem, fromIndex) {
        // array.prototype.indexOf 기능 함수형태로 구현
        var i,
            len = array.length;

        i = Math.abs(fromIndex) || 0;
        if (i > len) {
            return -1;
        }
        for (i; i < len; i++) {
            if (searchItem === array[i] && i in array) {
                return i;
            }
        }
        return -1;
    }

    function getShortArray() {
        // 인자로 받은 배열들 중 length 가 가장 짧은 배열 반환 ( 2개 이상 반환 가능 )
        if (arguments.length < 2 && !isArray(arguments[0][0])) {
            throw new TypeError('need' + 2 - arguments.length + ' more argument ');
        }

        var arg;
        if (isArray(arguments[0][0])) {
            arg = arrayMap(arguments[0], function(v) {
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

        for (i = 0; i < len; i++) {
            tempArrayLength = arg[(tempArray[0] ? tempArray[0] : 0)].length;
            currentLength = arg[i].length;

            if (!cnt || tempArrayLength >= currentLength) {
                if (tempArrayLength !== currentLength) {
                    tempArray.pop();
                }
                tempArray.push(i);
                cnt++;
            }
        }

        return arrayMap(tempArray, function(v) {
            return arg[v]
        });
    }

    function isArray(array) {
        return Object.prototype.toString.call(array) === '[object Array]';
    }

    array.arrayIntersect = arrayIntersect; // 배열들의 각 요소들 중 중복 값 배열을 반환
    array.arrayIndexOf = arrayIndexOf; // array.prototype.indexOf 기능 함수형태로 구현
    array.getShortArray = getShortArray; // 인자로 받은 배열들 중 length 가 가장 짧은 배열 반환 ( 2개 이상 반환 가능 )
    array.isArray = isArray;


    //
    // /* Date util */
    // function DateUtil(y, m, d) {
    //     this.date = new Date(y, m - 1, d);
    //     this.dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    //     this.dayTimes = 86400000; // 하루 밀리세컨드
    // }
    // DateUtil.prototype.getDate = function() {
    //     return this.date;
    // }
    // DateUtil.prototype.setDate = function(y, m, d) {
    //     this.date = new Date(y, m - 1, d);
    // }
    // DateUtil.prototype.addDate = function(days) {
    //     days = parseInt(days, 10);
    //     this.date = new Date(this.date.getTime() + days * this.dayTimes);
    // }
    //
    // // static property & Method
    // DateUtil.dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    // DateUtil.format = function(date, format) {
    //     // string형태로 반환 format 관련로직 추가 필요
    //     var delimiter = format.slice().replace(/[a-z]/gi, '').substr(0,1);
    //         //format = format.split(delimiter);
    //
    //
    //
    //     var dateObj = date,
    //         year = dateObj.getFullYear(),
    //         month = dateObj.getMonth() + 1,
    //         date = dateObj.getDate(),
    //         day = this.dayNames[dateObj.getDay()];
    //
    //     return '' + year + delimiter + month + delimiter + date + (format.indexOf('ddd') !== -1 ? ' (' + day + ')' : '')
    // }
    // DateUtil.diffDays = function(date1, date2) {
    //     // date1, date2의 날짜 차이 계산
    //     date1.setHours(0,0,0,0);
    //     date2.setHours(0,0,0,0);
    //
    //     return parseInt( Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24) , 10 );
    // }
    //
    // h2m.DateUtil = DateUtil;
    //

    global.h2m.array = array;
	global.h2m.obj = obj;
}.call(this));
