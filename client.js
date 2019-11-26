const axios = require('axios');

function a() {
	return axios.get('http://192.168.2.143:4222/users/12345');
}
function b() {
	return axios.get('http://192.168.2.143:4222/users/12345/permissions');
}
function c() {
	return axios.get('http://192.168.2.143:4222/users/c');
}
function end() {
	return axios.spread((a, b, c) => {
		// 上面两个请求都完成后，才执行这个回调方法
		console.log('a', a.data);
		console.log('b', b.data);
		console.log('c', c.data);
	});
}
axios.all([
	a(),
	b(),
	c(),
]).then(end());

// 但服务器处理并不是同一个时间响应
// a 1559805118605    === 12345
// b 1559805118631    ===12345/permissions
// c 1559805118637    ===ccccc