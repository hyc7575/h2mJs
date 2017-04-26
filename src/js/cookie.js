(function() {
    'use strict';
    var global = this;
    
    function cookie() {
        /**
         * @param  {string} cname 가져올 쿠키 이름
         * @return {string}
         */
        function getCookie(cname) {
            var value = '; ' + document.cookie;
            var parts = value.split('; ' + cname + '=');

            if (parts.length === 2) {
                return parts.pop().split(';').shift();
            }
        }


        /**
         * @description 쿠키 저장
         * @param  {string} cname 저장할 쿠키 이름
         * @param  {*} value 쿠키 값
         * @param  {string} path 쿠키 사용 경로 (일반적으로 루트 사용 '/')
         * @param  {number} days 쿠키 만료 기간 설정
         */
        function setCookie(cname, value, path, days) {
            var date, expires;
            if (days) {
                date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toUTCString();
            } else {
                expires = '';
            }
            document.cookie = cname + '=' + value + expires + ';path=' + path + ';';
        }


        /**
         * @description 쿠키 삭제
         * @param  {string} cname 삭제할 쿠키 이름
         * @param  {string} path  삭제할 쿠키 경로
         */
        function delCookie(cname, path) {
            document.cookie = cname + '=;path=' + path + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
        return {
            get: getCookie,
            set: setCookie,
            del: delCookie
        }
    }

    global.h2m.cookie = cookie();
}.call(this));
