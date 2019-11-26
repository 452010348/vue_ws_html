var filters = {
	substr:function(v,sl,el){
		var sl = sl||0;
		var el = el||100;
		// "0123".length>100?"0123".substr(0,100)+"...":"0123"
		return v.length>el?v.substr(sl,el)+"...":v
	}
}