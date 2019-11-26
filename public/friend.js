var title="";
//我的信息
var mine = {
  "username": "纸飞机" //我的昵称
  , "id": 123 //我的ID
  , "avatar": "http://tva3.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" //我的头像
  , "sign": "懒得签名"
};

//我的好友列表
var friend = [
  {
    groupname: "客服列表",
    "id": 0,
    "list": [
      // {
      //   "username": "贤心",
      //   "id": "100001",
      //   "avatar": "http://tva3.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg",
      //   "sign": "这些都是测试数据，实际使用请严格按照该格式返回",
      //   "status": "online"
      // },
    ]
  },
  // {
  //   groupname: "网红",
  //   "id": 1,
  //   "list": [
  //     {
  //       "username": "罗玉凤",
  //       "id": "121286",
  //       "avatar": "http://tva3.sinaimg.cn/crop.0.0.512.512.180/48f122e6jw8fcmi072lkyj20e80e8t9i.jpg",
  //       "sign": "在自己实力不济的时候，不要去相信什么媒体和记者。他们不是善良的人，有时候候他们的采访对当事人而言就是陷阱"
  //     },
  //   ]
  // },
  // {
  //   groupname: "我心中的女神",
  //   "id": 2,
  //   "list": [
  //     {
  //       "username": "林心如",
  //       "id": "76543",
  //       "avatar": "http://tva3.sinaimg.cn/crop.0.0.512.512.180/48f122e6jw8fcmi072lkyj20e80e8t9i.jpg",
  //       "sign": "我爱贤心"
  //     },
  //   ]
  // }
];

//分组
var group = [
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
];


//扩展更多列表
var moreList = [
  {
    alias: 'login', 
    title: '客服登入', 
    iconUnicode: '',  
    iconClass: 'layui-icon-chat', 
  },
  {
    alias: 'find', 
    title: '发现', 
    iconUnicode: '&#xe628;',  //图标字体的unicode，可不填
    iconClass: '', //图标字体的class类名
  },
  {
    alias: 'share', 
    title: '分享与邀请', 
    iconUnicode: '&#xe641;', 
    iconClass: '', 
  },
  {
    alias: 'test', 
    title: 'test', 
    iconUnicode: '', 
    iconClass: 'layui-icon-tree', 
  },
];