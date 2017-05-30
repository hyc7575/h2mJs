(function(global) {
	'use stric';

	var host = location.host;
	function consoleOnlyLocal() {
		var oldConsole = Object.assign({}, global.console);
	    (function(oc) {
			global.console = new Object();
	        global.console.log = function(txt) {
	            if( host.indexOf('localhost') !== -1 || host.indexOf('127.0.0.1') !== -1 ) {
	                oc.log(txt)
	            } else {
	                oc.log('console use only localhost');
	            }
	        }
	    })(oldConsole);
	}
	global.h2m.consoleOnlyLocal = consoleOnlyLocal;
})(window);
