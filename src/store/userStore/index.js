/*eslint no-extend-native: ["error", { "exceptions": ["Date"] }]*/

const defaultStore = {
  value: "User的初始值",
  list: [
    {
      title: "账号",
      titleItem: [
        {
          tit: "账号与安全",
          iconfont: "iconfont icon-zhanghao",
          rightIcon: "iconfont icon-iconfonti",
          flag: "accountSecurity",
        },
        {
          tit: "隐私设置",
          iconfont: "iconfont icon-lock",
          rightIcon: "iconfont icon-iconfonti",
        },
      ],
    },
    {
      title: "通用",
      titleItem: [
        {
          tit: "通知设置",
          iconfont: "iconfont icon-tongzhi",
          rightIcon: "iconfont icon-iconfonti",
        },
        {
          tit: "动态壁纸",
          iconfont: "iconfont icon-ai250",
          rightIcon: "iconfont icon-iconfonti",
        },
        {
          tit: "通用设置",
          iconfont: "iconfont icon-shezhiziduan",
          rightIcon: "iconfont icon-iconfonti",
        },
      ],
    },
    {
      title: "关于",
      titleItem: [
        {
          tit: "用户协议",
          iconfont: "iconfont icon-yonghuxieyi-",
          rightIcon: "iconfont icon-iconfonti",
        },
        {
          tit: "社区自律公约",
          iconfont: "iconfont icon-xieyixiangqing",
          rightIcon: "iconfont icon-iconfonti",
        },
        {
          tit: "隐私政策",
          iconfont: "iconfont icon-yinsizhengce-",
          rightIcon: "iconfont icon-iconfonti",
        },
        {
          tit: "关于抖某",
          iconfont: "iconfont icon-iconset0142",
          rightIcon: "iconfont icon-iconfonti",
        },
        {
          tit: "反馈与帮助",
          iconfont: "iconfont icon-fankui",
          rightIcon: "iconfont icon-iconfonti",
        },
        {
          tit: "清理占用空间",
          iconfont: "iconfont icon-delete",
          rightIcon: "iconfont icon-iconfonti",
        },
        {
          tit: "账号切换",
          iconfont: "iconfont icon-icon-",
          rightIcon: "iconfont icon-iconfonti",
        },
        {
          tit: "退出登录",
          iconfont: "iconfont icon-tuichudenglu",
          rightIcon: "iconfont icon-iconfonti",
          flag: "sign out",
        },
      ],
    },
  ],
  judgment: false,
  Show: true,
  isHidden: false,
  phoneUrl: "",
  finPhone: "",
  password: "",
  bannerUrl: "",
  photoCenter: "编辑资料",
  name: "小水先生",
  upid: 1572868220,
  upDescribe: "这里是简介~",
  label: [
    { id: 1, tag: "东莞" },
    { id: 2, tag: "+添加性别、学校等标签" },
  ],
  zans: "21",
  follows: "24",
  fans: "14",
  myVideo: [],
  activeTab: 0,
  menuList: [
    { id: 1, iconfont: "icon-gerenmingpian", msg: "个人名片" },
    {
      id: 2,
      iconfont: "icon-digital",
      msg: "创作者服务中心",
      borderBottom: true,
    },
    { id: 3, iconfont: "icon-qianbao", msg: "钱包" },
    { id: 4, iconfont: "icon-ding_huabanfuben", msg: "订单" },
    { id: 5, iconfont: "icon-fenlei", msg: "服务" },
    { id: 6, iconfont: "icon-lianjie", msg: "功能" },
    { id: 7, iconfont: "icon-kaquan", msg: "卡券", borderBottom: true },
    {
      id: 8,
      iconfont: "icon-yusan",
      msg: "未成年保护工具",
      borderBottom: true,
    },
    { id: 9, iconfont: "icon-chilun", msg: "设置", route: "/user/setup" },
  ],
  dynamic: [],
  like: [],

  userCheckUpdate: "000",
  userVid: "0",

  videoAuthorIsUpid: true,
};

// 方法统一写在这里，看懂示例之后将示例删除
const fn = {
  showMessage: (store, action) => {
    store.judgment = action.judgment;
    return store;
  },
  hideMessage: (store, action) => {
    store.judgment = action.judgment;
    return store;
  },
  changeShow: (store, action) => {
    store.Show = action.Show;
    store.isHidden = action.isHidden;
    return store;
  },
  changephone: (store, action) => {
    if (/^[0-9]+?$/.test(action.phone) || action.phone.length === 0) {
      store.phone = action.phone;
    }
    if (action.phone.length === 11 && /^1[3456789]\d{9}$/.test(action.phone)) {
      document.getElementById("warning").style.display = "none";
      document.getElementById("btn").style.background = "#fe2b54";
    } else {
      document.getElementById("btn").style.background = "#d8d8d8";
    }
    return store;
  },
  gsvc: (store, action) => {
    store.finPhone = action.phone;
    return store;
  },
  changePassword: (store, action) => {
    store.password = action.password;
    return store;
  },

  changeTab: (store, action) => {
    store.activeTab = action.payload;
    return store;
  },
  updateData: (store, action) => {
    if (action.payload) {
      store.userVid = action.userVid;
      store.bannerUrl = action.payload.bannerUrl;
      store.photoUrl = action.payload.photoUrl;
      store.name = action.payload.upName;
      store.upid = action.payload.upid;

      // 设置cookie
      document.cookie = "upid=" + action.payload.upid;

      store.upDescribe = action.payload.upDescribe;
      let array = [];
      let arr = action.payload.label.split(",");
      for (let index in arr) {
        let obj = {};
        obj.id = index + "1";
        obj.tag = arr[index];
        array.push(obj);
      }
      array.push({ id: array.length, tag: "+添加性别、学校等标签" });
      store.label = array;
      let zans = action.payload.zans;
      let follows = action.payload.follows;
      let fans = action.payload.fans;
      store.zans = zans;
      store.follows = follows;
      store.fans = fans;
      if (parseInt(zans) >= 10000) {
        store.zans = (zans / 10000).toFixed(1) + "w";
      }
      if (parseInt(follows) >= 10000) {
        store.follows = (follows / 10000).toFixed(1) + "w";
      }
      if (parseInt(fans) >= 10000) {
        store.fans = (fans / 10000).toFixed(1) + "w";
      }
    }

    return store;
  },
  changePhotoCenter: (store, action) => {
    store.photoCenter = action.payload;
    store.videoAuthorIsUpid = action.bool;
    return store;
  },

  updateMyVideo: (store, action) => {
    let array = [];
    for (let index in action.payload) {
      let obj = {};
      obj.id = index + "2";
      obj.href = action.payload[index].videoSrc;
      obj.img = action.payload[index].videoCover;
      obj.vid = action.payload[index].vid;
      let player = action.payload[index].player;
      if (parseInt(player) >= 10000) {
        obj.player = (player / 10000).toFixed(1) + "w";
      } else {
        obj.player = player;
      }
      array.push(obj);
    }
    store.myVideo = array;
    console.log(store.myVideo);

    return store;
  },
  updateDynamic: (store, action) => {
    store.dynamic = [];
    for (let index in action.payload) {
      let obj = {};
      obj.id = index + "4";
      obj.photo = action.payload[index].photoUrl;
      obj.name = action.payload[index].upName;
      obj.videoImg = action.payload[index].videoCover;
      obj.videoSrc = action.payload[index].videoSrc;

      Date.prototype.format = function (fmt) {
        var o = {
          "M+": this.getMonth() + 1, //Month
          "d+": this.getDate(), //Day
          "h+": this.getHours(), //Hour
          "m+": this.getMinutes(), //Minute
          "s+": this.getSeconds(), //Second
          "q+": Math.floor((this.getMonth() + 3) / 3), //Season
          S: this.getMilliseconds(), //millesecond
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,

              RegExp.$1.length === 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };

      let time = new Date(action.payload[index].videoCreateTime).format(
        // "yyyy/MM/dd hh:mm:ss"
        "MM-dd"
      );
      obj.date = time;
      // obj.zan = action.payload[index].zanCount;
      obj.msg = action.payload[index].musicDescribe;
      obj.vid = action.payload[index].vid;

      let zan = action.payload[index].zanCount;
      if (parseInt(zan) >= 10000) {
        obj.zan = (zan / 10000).toFixed(1) + "w";
      } else {
        obj.zan = zan;
      }
      store.dynamic.push(obj);
    }
    return store;
  },
  updateLike: (store, action) => {
    store.like = [];
    console.log(action);
    for (let index in action.payload) {
      let obj = {};
      obj.id = index + "4";
      obj.href = action.payload[index].videoSrc;
      obj.img = action.payload[index].videoCover;
      let player = action.payload[index].player;
      if (parseInt(player) >= 10000) {
        obj.player = (player / 10000).toFixed(1) + "w";
      } else {
        obj.player = player;
      }
      store.like.push(obj);
    }
    return store;
  },

  changeUserCheckUpdate: (store, action) => {
    console.log(action);
    // store.userCheckUpdate=action.payload
    return store;
  },

  freshUser: (store, action) => {
    store.userCheckUpdate = action.payload;
    return store;
  },
};

// store中不要出现undefined、null、NaN

const reducer = function (store = defaultStore, action) {
  if (action.type.indexOf("redux") === -1) {
    if (fn[action.type]) {
      store = fn[action.type](store, action);
    }
  }
  return JSON.parse(JSON.stringify(store));
};

export default reducer;
