(function() {
    'use stric';

    var global = this;

    var string = {};

    function addComma(num) {
        num = '' + num;
        return num.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }
    // 숫자에 ',' 삭제하여 number형태로 return
    function removeComma(num) {
        num = '' + num;
        return parseInt(num.replace(/,/g, ''), 10);
    }
    string.addComma = addComma;
    string.removeComma = removeComma;

    // 숫자를 제외하고 전부 삭제해서 return
    function leaveOnlyNumber(val) {
        return val.replace(/[^0-9\-]/gi, '');
    }
    string.leaveOnlyNumber = leaveOnlyNumber;



    /**
     * @description 핸드폰 번호 자동으로 하이픈 처리
     * @param  {string} str 전화번호
     * @return {string}
     */
    function autoHypenPhone(str) {
        // input bind keyup event
        //
        str = str.replace(/[^0-9]/g, '');
        var tmp = '';
        if (str.length < 4) {
            return str;
        } else if (str.length < 7) {
            tmp += str.substr(0, 3);
            tmp += '-';
            tmp += str.substr(3);
            return tmp;
        } else if (str.length < 11) {
            tmp += str.substr(0, 3);
            tmp += '-';
            tmp += str.substr(3, 3);
            tmp += '-';
            tmp += str.substr(6);
            return tmp;
        } else {
            tmp += str.substr(0, 3);
            tmp += '-';
            tmp += str.substr(3, 4);
            tmp += '-';
            tmp += str.substr(7);
            return tmp;
        }
        return str;
    }

    /**
     * @description 휴대폰 번호 정규식 체크
     * @param {string} str 전화번호
     * @return {boolean}
     */
    function chkPhoneTel(str) {
        var reg = /^(01[016789]{1}|070|02|0[3-9]{1}[0-9]{1})-[0-9]{3,4}-[0-9]{4}$/;
        return reg.test(str);
    }
    string.autoHypenPhone = autoHypenPhone;
    string.chkPhoneTel = chkPhoneTel;

    /**
     * @description 특정 기호 convert
     * @param  {string} str 문자열
     * @return {string}     컨비팅 된 문자열
     */
    function escapeHtml(str) {
        var entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };
        return String(str).replace(/[&<>"'`=\/]/g, function (s) {
            return entityMap[s];
        });
    }
    string.escapeHtml = escapeHtml;


    /**
     * @description url 파라미터를 객체 key value 형태로 뽑아주는 함수
     * @example
     * querystring() // http://www.wdgbook.com?q=2&content=testContent, return { q: 2, content: 'testContent'}
     * @return {Object}
     */
    function queryString() {
        var queryString = {},
            query = global.location.search.substring(1),
            queryArr = query.split('&'),
            i

        for (var i = 0; i < queryArr.length; i++) {
            var pair = queryArr[i].split("=");
            if (typeof queryString[pair[0]] === "undefined") {
                queryString[pair[0]] = pair[1]; // decodeURIComponent(pair[1]);
            } else if (typeof queryString[pair[0]] === "string") {
                var arr = [queryString[pair[0]], pair[1]]; // decodeURIComponent(pair[1]) ];
                queryString[pair[0]] = arr;
            } else {
                queryString[pair[0]].push(pair[1]); // decodeURIComponent(pair[1]));
            }
        }
        return queryString;
    }
    string.queryString = queryString;

    global.h2m.string = string;
}.call(this));
