// ie 하위버전 지원을 위한 polfyfill 및 객체 확장영역 (MDN polyfill 참조)
(function(global) {
    'use strict';

    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        StringProto = String.prototype;

    if (typeof Object.assign != 'function') {
        (function() {
            Object.assign = function(target) {
                'use strict';
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }
                var output = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (source !== undefined && source !== null) {
                        for (var nextKey in source) {
                            if (source.hasOwnProperty(nextKey)) {
                                output[nextKey] = source[nextKey];
                            }
                        }
                    }
                }
                return output;
            };
        })();
    }

    // ie8 console log 객체 생성 (에러 방지)
    if (typeof window.console === 'undefined' || typeof window.console.log === 'undefined') {
        global.console = {
            log: function() {}
        };
    }

    // 문자열 앞, 뒤 공백 제거
    if (!StringProto.trim) {
        StringProto.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        };
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
	if (!Array.prototype.every) {
		Array.prototype.every = function(callbackfn, thisArg) {
			'use strict';
			var T, k;

			if (this == null) {
				throw new TypeError('this is null or not defined');
			}
			var O = Object(this);
			var len = O.length >>> 0;

			if (typeof callbackfn !== 'function') {
				throw new TypeError();
			}

			if (arguments.length > 1) {
				T = thisArg;
			}
			k = 0;
			while (k < len) {
				var kValue;
				if (k in O) {
					kValue = O[k];
					var testResult = callbackfn.call(T, kValue, k, O);
					if (!testResult) {
						return false;
					}
				}
				k++;
			}
			return true;
		};
	}
    if (!Object.keys) {
        Object.keys = (function() {

            var hasOwnProperty = ObjProto.hasOwnProperty,
                hasDontEnumBug = !({
                    toString: null
                }).propertyIsEnumerable('toString'),
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
                var result = [],
                    prop, i;

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

    // Array 확장
    Array.prototype.unique = function() {
        // array 내에서 중복 값 제거
        var a = this.concat();
        for( var i = 0; i < a.length; ++i ) {
            for( var j = i + 1; j < a.length; ++j ) {
                if( a[i] === a[j] )
                    a.splice(j--, 1);
            }
        }

        return a;
    };
    Array.prototype.intersect = function(arr) {
        // array1 과 array2의 중복 값 반환 (파라미터 1개만 받을 수 있음)
        return this.filter(function(v) {
            return arr.indexOf(v) !== -1;
        });
    }
})(window);
