var commonFn = {
	//用法
	// loadJS('file.js',function(){
	//   alert(1);
	// });
	loadJS:function(url, callback, err) {
	 var script = document.createElement('script'),
	 fn = callback || function () {};
 
	 script.type = 'text/javascript';
	 //IE
	 if (script.readyState) {
		 script.onreadystatechange = function () {
			 if (script.readyState == 'loaded' || script.readyState == 'complete') {
				 script.onreadystatechange = null;
				 fn && fn();
			 }
		 };
	 } else {
		 //其他浏览器
		 script.onload = function () {
			 fn && fn(url);
		 };
		 script.onerror = function () {
			 err && err(url)
		 }
	 }
	 script.src = url;
	 document.getElementsByTagName('head')[0].appendChild(script);
 }
}


