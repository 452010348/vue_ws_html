/**
 * 1. 客户端连接ws 
 * 2. 返回游客信息
 * 3. 返回固定的客户列表
 * 			1. 检测遍历当前连接池 客服在线数量 并返回客服列表 处理是否在线状态
 * 4. [login]会员登入 - 检测验证账号
 * 		把连接池 userinfo 替换一下
 * 		成功
 * 			1. 返回账号信息
 * 			2. 返回账号类型 客服直接标记在线
 * 		失败
 * 			1. 返回错误码
 */


var WebSocket = require('ws');
//type = friend、group等字符，如果是group，则创建的是群聊
// username //好友昵称
//若值为offline代表离线，online或者不填为在线
var kefu_list = [
	{ id: 1, username: "金牛客服1", key: "", login_name: "jn001", password: "abc123", type: "kefu", name: "金牛客服1", status: "offline", avatar: "http://tva3.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg", sign: "签名" },
	{ id: 2, username: "金牛客服2", key: "", login_name: "jn002", password: "abc123", type: "kefu", name: "金牛客服2", status: "offline", avatar: "http://tva3.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg", sign: "签名" },
	{ id: 3, username: "金牛客服3", key: "", login_name: "jn003", password: "abc123", type: "kefu", name: "金牛客服3", status: "offline", avatar: "http://tva3.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg", sign: "签名" },
]

var wss = null;
var online_num = 0;//在线人数
var online_client = {};//在线客户端

function ws(server) {
	wss = new WebSocket.Server({ server: server });
	wss.on('connection', (client, req) => {
		// console.log('监听用户连接成功');
		connection(client, req);

		client.onmessage = (e) => {
			try {
				let obj = JSON.parse(e.data);
				switch (String(obj.cmd)) {
					//初始化我的信息
					case "mine": mine(e, obj); break;
					//获取分组
					case "group": group(e, obj); break;
					//初始化好友列表
					case "friend": friend(e, obj); break;
					//账号登入
					case "login": login(e, obj); break;
					//在线人数
					case "online_number": online_number(e, obj); break;
					//接收消息
					case "message": message(e, obj); break;
					default:
						var d = JSON.stringify({ cmd: 404, data: { message: e.data } })
						console.log(d)
						e.target.send(d);
						break;
				}
			} catch (error) {
				var d = JSON.stringify({ cmd: 500, data: { message: e.data } })
				console.log(d)
				e.target.send(d);
			}
		}
		client.onclose = (e) => {
			onclose(e);
		}
		client.onerror = (e) => {
			console.log(`onerror`)
			e.target.send(JSON.stringify({ cmd: "close" }))
		}
		// client.onopen = (e) => { console.log(`onerror`) }
	});

	wss.on('listening', () => {
		console.log(`ws服务启动成功`);
		var addr = server.address();
		if (addr.port == 443) {
			var protocol = 'wss://';
		} else {
			var protocol = 'ws://';
		}
		console.log('---------------------------------------------');
		console.log(protocol + getIPAdress() + ':' + addr.port);
		console.log('---------------------------------------------');
	});

	wss.on('close', (e) => {
		console.log('close')
	}, this);
}



//用户连接ws
function connection(client, req) {
	// var token = req.headers["token"];
	var key = req.headers["sec-websocket-key"]
	const id = Date.now();
	online_num++;
	client.id = id
	client.key = key
	var userinfo = {
		id: id,
		key: key,
		type: "friend",
		username: id,
		name: `游客${String(id).substr(String(id).length - 5, String(id).length)}`,
		avatar: "http://tva3.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg",
		status : "online",
		time:Date.now(),
	}
	client.userinfo = userinfo
	online_client[key] = client

	//修改客服状态
	kefu_list.map((el)=>{
		if(el.key==client.key){
			el.key = client.key;
			el.status == "online"
		}
	})


	//群发
	var d = JSON.stringify({
		cmd: "visitor_enter",
		data: userinfo
	})
	console.log(d);
	Object.keys(online_client).forEach((key) => {
		online_client[key].send(d)
	})

}


//用户退出关闭
function onclose(e) {
	try {
		kefu_list.map((el)=>{
			if(el.key==e.target.key){
				el.key = e.target.key;
				el.status == "offline"
			}
		})
		e.target.userinfo.status = "offline";

		var key = e.target.key;
		var userinfo = Object.assign({}, e.target.userinfo);
		delete online_client[key];
		online_num--;

		//群发
		Object.keys(online_client).forEach((key, i) => {
			//好友离线 客服离线
			var d = JSON.stringify({
				cmd: "offline",
				code: 1,
				data: userinfo
			})
			online_client[key].send(d)
			if (i == 0) {
				console.log(d)
			}
		})


	} catch (error) {
		var d = JSON.stringify({ cmd: "closs_err", code: 0, data: {} })
		console.log(d)
		e.target.send(d)
	}
}

//初始化我的信息
function mine(e, obj) {
	//发送我的信息
	var d = JSON.stringify({
		cmd: "mine",
		data: e.target.userinfo
	})
	console.log(d)
	//单发
	e.target.send(d);
}
//获取分组
function group(e, obj) {
	var d = JSON.stringify({
		cmd: "group",
		code: 1,
		data: [
			{
				"groupname": "前端群",
				"id": "101",
				"avatar": "http://tp2.sinaimg.cn/2211874245/180/40050524279/0"
			},
			{
				"groupname": "Fly社区官方群",
				"id": "102",
				"avatar": "http://tp2.sinaimg.cn/5488749285/50/5719808192/1"
			}
		]
	})
	e.target.send(d)
}
//初始化好友列表
function friend(e, _obj) {

	//发送客服列表
	var obj = {}
	kefu_list.forEach((el, i) => {
		obj[el.id] = el
		delete obj.password;
	})

	var list = []
	Object.keys(obj).forEach((id) => {
		list.push(obj[id])
	})

	Object.keys(online_client).forEach((key) => {
	list.map((el) => {
			if (el.key == key) {
				el.status = "online"
				delete el.password;
			}
			return el;
		})
	})

	var d = JSON.stringify({
		cmd: "friend",
		data: [
			{
				groupname: "客服列表",
				"id": 0,
				"list": list
			},
		]
	})
	console.log(d)
	//单发
	e.target.send(d);
}

//登入-把连接池 userinfo 替换一下
function login(e, obj) {
	var login_name = obj.data.login_name
	var password = obj.data.password
	var userinfo = []
	kefu_list.forEach((o, i) => {
		if (o.login_name == login_name && o.password == password) {
			userinfo.push({
				id: o.id,
				key: o.key,
				type: o.type,
				username: o.username,
				name: o.name,
				avatar: o.avatar,
				status : "online",
				time:Date.now(),
			})
		}
	})
	if (userinfo.length > 0) {
		var key = e.target.key
		var userinfo = userinfo[0];
		userinfo.key = key
		e.target.id = userinfo.id
		e.target.userinfo = userinfo

		//单发
		var d = JSON.stringify({ cmd: "login", code: 1, data: userinfo });
		e.target.send(d);
		console.log("单发", d)


		Object.keys(online_client).forEach((k, i) => {
			//群发退出了
			var d = JSON.stringify({ cmd: "offline", code: 1, data: userinfo })
			online_client[k].send(d)
			if (i == 0) {
				console.log("非自己", d)
			}

			//群发上线
			var d = JSON.stringify({ cmd: "online", code: 1, data: userinfo });
			online_client[k].send(d)
			if (i == 0) {
				console.log("群发", d)
			}

		})



	} else {
		var d = JSON.stringify({ cmd: "login", code: 0, data: { message: "账号密码错误！" } });
		console.log(d)
		e.target.send(d);
	}
}

//在线人数
function online_number(e, obj) {
	var d = JSON.stringify({ cmd: "online_number", code: 1, data: { online_num: online_num } })
	e.target.send(d);
}


//接收消息
function message(e, obj) {
	var form_id = e.target.id;
	var form_key = e.target.key;
	var form_userinfo = e.target.userinfo;

	var to_id = obj.data.id;
	var to_key = obj.data.key;
	var to_userinfo = obj.data;
	//userinfo  对 obj.data
	if (!to_key || !online_client[to_key]) {
		var d = JSON.stringify({ cmd: "message", code: 0, data: { message: "用户不在线!" } })
		e.target.send(d);
	} else {
		//用户在线
		var d = JSON.stringify({
			cmd: "message",
			code: 1,
			data: {
				...form_userinfo,
				content: obj.data.content
			}
		})
		online_client[to_key].send(d)
	}
	console.log(d)
}





process.on('uncaughtException', function (err) {
	console.log('===================');
	console.log('===================');
	console.log('===================');
	console.log('服务器异常处理：', err);
	console.log('===================');
	console.log('===================');
	console.log('===================');
});





































//node如何获取本机local ip
function getIPAdress() {
	var interfaces = require('os').networkInterfaces();
	for (var devName in interfaces) {
		var iface = interfaces[devName];
		for (var i = 0; i < iface.length; i++) {
			var alias = iface[i];
			if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
				return alias.address;
			}
		}
	}
}


module.exports = ws;




