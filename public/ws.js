

function ws_init(){
  //实现化Webws对象，指定要连接的服务器地址与端口
  ws = new WebSocket(ws_url[ws_i]);
  //打开事件
  ws.onopen = function(e) {
    console.log( "onopen",e.data)
    ws_send({ cmd: "mine" })
    ws_send({ cmd: "group" })
    ws_send({ cmd: "friend" })
    ws_send({ cmd: "online_number" })
  };
  //获得消息事件
  ws.onmessage = function(e) {
    try {
      var d = JSON.parse(e.data);
      switch(d.cmd){
        //初始化我的信息
        case "mine":
          console.log( e.data )
          mine = d.data
          title = mine.name;
          layim.cache().base.title = mine.name
          layim.cache().base.init.mine = mine
          layim.cache().mine = mine;
          layim.update();
          break
          //获取分组
          case "group":
            console.log( e.data )
            group = d.data;
            layim.cache().base.init.group = group;
            layim.update();
          break
        //初始化好友列表
        case "friend":
          console.log(e.data)
          friend = d.data
          layim.cache().base.init.friend =  friend
          layim.cache().friend = friend
          layim.update();
          break
        //用户登入
        case "login":
          console.log(e.data)
          if(d.code==1){
            //用户信息
            mine = d.data
            // $('.layim-title p').html(mine.name)
            title=mine.name;
            layim.cache().base.title = mine.name;
            layim.cache().base.init.mine = mine
            layim.cache().mine = mine;
            layim.update();

            layer.close(login_index);
            layer.close(login_open_index);
            layer.alert('登入成功！');
          }
          if(d.code==0){
            layer.alert('账号密码错误！')
          }
          break
        //好友上线
        case "online":
          console.log(e.data)
          var id = d.data.id;
          layim.setFriendStatus(id, 'online');
          friend[0].list = friend[0].list.map(function (el) {
            var o = el;
            if (el.id == id) {
              o = d.data;
              o.id = d.data.id;
              o.status = "online";
            }
            return o
          })
          debugger
          break;
        //好友离线
        case "offline":
          console.log(e.data)
          var id = d.data.id;
          layim.setFriendStatus(id, 'offline');
          friend[0].list = friend[0].list.map(function (el) {
            var o = el;
            if (el.id == id) {
              o.id = id
              o.status = "offline"
            }
            return o
          })
         
          break;
        //接收消息
        case "message":
          if(d.code==1){
            layim.getMessage({
              username: d.data.username,
              avatar: d.data.avatar,
              id: d.data.id,
              type: d.data.type,
              content: d.data.content,
            });
          }
          if(d.code==0){
            layim.msg('用户不在线')
          }
          console.log(e.data)
          break;
        case "404":
        case "500":
          debugger
          // layer.closeAll()
          break;
      }
    } catch (error) {
      console.log( "onmessage_err",e.data)
    }
  };
  //关闭事件
  ws.onclose = function(e) {
  
  };
  //发生了错误事件
  ws.onerror = function(e) {
    console.log( "onerror",e)
    ws_i++;
    if(ws_i>=ws_url.length){
      ws_i=0;
    }
    ws.close();
    ws=null;
    ws_init()
  }
}

//关闭WebSocket
function ws_close(){
  console.log( "ws_close",e)
  ws=null;
  ws_init();
}
//发送数据
function ws_send(d){
  if(!!ws){
    ws.send(JSON.stringify(d))
  }else{
    location.reload();
  }
}