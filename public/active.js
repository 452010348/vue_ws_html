//面板外的操作
var active = {
  //自定义会话
  cache: function () {
    layer.alert(JSON.stringify(layim.cache().mine))
    console.log(layim.cache())
  },
  //自定义会话
  chat: function () {
    layim.chat({
      name: '小闲'
      , type: 'friend'
      , avatar: '//tva3.sinaimg.cn/crop.0.0.180.180.180/7f5f6861jw1e8qgp5bmzyj2050050aa8.jpg'
      , id: 1008612
    });
    layer.msg('也就是说，此人可以不在好友面板里');
  }
  //制造好友消息
  , message: function () {
    layim.getMessage({
      username: "贤心"
      , avatar: "//tp1.sinaimg.cn/1571889140/180/40030060651/1"
      , id: "100001"
      , type: "friend"
      , content: "嗨，你好！欢迎体验LayIM。演示标记：" + new Date().getTime()
      , timestamp: new Date().getTime()
    });
  }
  //接受音频消息
  , messageAudio: function () {
    layim.getMessage({
      username: "林心如"
      , avatar: "//tp3.sinaimg.cn/1223762662/180/5741707953/0"
      , id: "76543"
      , type: "friend"
      , content: "audio[http://gddx.sc.chinaz.com/Files/DownLoad/sound1/201510/6473.mp3]"
      , timestamp: new Date().getTime()
    });
  }
  //接受视频消息
  , messageVideo: function () {
    layim.getMessage({
      username: "林心如"
      , avatar: "//tp3.sinaimg.cn/1223762662/180/5741707953/0"
      , id: "76543"
      , type: "friend"
      , content: "video[http://www.w3school.com.cn//i/movie.ogg]"
      , timestamp: new Date().getTime()
    });
  }
  //接受临时会话消息
  , messageTemp: function () {
    layim.getMessage({
      username: "小酱"
      , avatar: "//tva1.sinaimg.cn/crop.7.0.736.736.50/bd986d61jw8f5x8bqtp00j20ku0kgabx.jpg"
      , id: "198909151014"
      , type: "friend"
      , content: "临时：" + new Date().getTime()
    });
  }
  , add: function () {
    //实际使用时数据由动态获得
    layim.add({
      type: 'friend'
      , username: '麻花疼'
      , avatar: '//tva1.sinaimg.cn/crop.0.0.720.720.180/005JKVuPjw8ers4osyzhaj30k00k075e.jpg'
      , submit: function (group, remark, index) {
        layer.msg('好友申请已发送，请等待对方确认', {
          icon: 1
          , shade: 0.5
        }, function () {
          layer.close(index);
        });

        //通知对方
        /*
        $.post('/im-applyFriend/', {
          uid: info.uid
          ,from_group: group
          ,remark: remark
        }, function(res){
          if(res.status != 0){
            return layer.msg(res.msg);
          }
          layer.msg('好友申请已发送，请等待对方确认', {
            icon: 1
            ,shade: 0.5
          }, function(){
            layer.close(index);
          });
        });
        */
      }
    });
  }
  //创建群
  , addqun: function () {
    layim.add({
      type: 'group'
      , username: 'LayIM会员群'
      , avatar: '//tva2.sinaimg.cn/crop.0.0.180.180.50/6ddfa27bjw1e8qgp5bmzyj2050050aa8.jpg'
      , submit: function (group, remark, index) {
        layer.msg('申请已发送，请等待管理员确认', {
          icon: 1
          , shade: 0.5
        }, function () {
          layer.close(index);
        });

        //通知对方
        /*
        $.post('/im-applyGroup/', {
          uid: info.uid
          ,from_group: group
          ,remark: remark
        }, function(res){
        
        });
        */
      }
    });
  }
  //同意后，将好友追加到主面板
  , addFriend: function () {
    layim.addList({
      type: "friend"
      , username: "李彦宏"
      , avatar: '//tva4.sinaimg.cn/crop.0.0.996.996.180/8b2b4e23jw8f14vkwwrmjj20ro0rpjsq.jpg'//头像
      , groupid: 0 //所在的分组id
      , id: 1234560 //好友ID
      , sign: "好友签名" //好友签名
    });
  }
  //增加一个群组
  , addGroup: function () {
    layer.msg('已成功把[Angular开发]添加到群组里', { icon: 1 });
    layim.addList({
      type: 'group'
      , avatar: "//tva3.sinaimg.cn/crop.64.106.361.361.50/7181dbb3jw8evfbtem8edj20ci0dpq3a.jpg"
      , groupname: 'Angular开发'
      , id: "12333333"
      , members: 0
    });
  }
  //删除一个好友
  , removeFriend: function () {
    layer.msg('已成功删除[凤姐]', { icon: 1 });
    layim.removeList({ id: 1234560, type: 'friend' });

  }
  //删除一个群组
  , removeGroup: function () {
    layer.msg('已成功删除[前端群]', { icon: 1 });
    layim.removeList({ id: 101, type: 'group' });
  }
  //置灰离线好友
  , setGray: function () {
    layim.setFriendStatus(168168, 'offline');

    layer.msg('已成功将好友[马小云]置灰', { icon: 1 });
  }
  //取消好友置灰
  , unGray: function () {
    layim.setFriendStatus(168168, 'online');

    layer.msg('成功取消好友[马小云]置灰状态', { icon: 1 });
  }
  //移动端版本
  , mobile: function () {
    var device = layui.device();
    var mobileHome = '/layim/demo/mobile.html';
    if (device.android || device.ios) {
      return location.href = mobileHome;
    }
    var index = layer.open({
      type: 2
      , title: '移动版演示 （或手机扫右侧二维码预览）'
      , content: mobileHome
      , area: ['375px', '667px']
      , shadeClose: true
      , shade: 0.8
      , end: function () {
        layer.close(index + 2);
      }
    });
    layer.photos({
      photos: {
        "data": [{
          "src": "http://cdn.layui.com/upload/2016_12/168_1481056358469_50288.png",
        }]
      }
      , anim: 0
      , shade: false
      , success: function (layero) {
        layero.css('margin-left', '350px');
      }
    });
  }
};

