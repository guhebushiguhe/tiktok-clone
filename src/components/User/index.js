import React, { Component } from "react";
import {
  ChangeTab,
  updateData,
  updateMyVideo,
  updateLike,
  updateDynamic,
  changePhotoCenter,
} from "../../store/userStore/action";
import { ChangeUserCheckUpdate } from "../../store/homeStore/action";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../../sass/User.scss";
import menu from "../../assets/images/users/menu.svg";
import { Drawer, Carousel, WingBlank } from "antd-mobile";
import Home from "../Home/index";
import axios from "../../unit";

class index extends Component {
  constructor(props) {
    super(props);
    this.path = this.props.history.location.pathname;
  }
  state = {
    open: true,
  };
  componentDidMount() {
    if (this.path === "/" || this.path === "/samecity") {
      let width = document.documentElement.offsetWidth;
      let menu = document.getElementsByClassName("am-drawer-sidebar");
      for (let i in menu) {
        if (menu[i].toString() === "[object HTMLDivElement]") {
          menu[i].style = menu[i].style.cssText +=
            "right:" + -width + "px;display:none";
        }
      }
    }

    let cookies = document.cookie.split("; ");
    let obj = {};
    for (let item of cookies) {
      let temp = item.split("=");
      obj[temp[0]] = temp[1];
    }
    if (this.path === "/user" || this.path === "/samecity") {
      axios.post("/user/getUserMsg", { phone: obj.phone }).then((res) => {
        if (res.code === 0) {
          this.props.updateData(res.data);
        }
      });
      axios.post("/user/phoneToAllVideo", { phone: obj.phone }).then((res) => {
        if (res.code === 0) {
          this.props.updateMyVideo(res.data);
          this.props.updateDynamic(res.data);
        }
      });
      axios.post("user/like", { upid: obj.upid }).then((res) => {
        if (res.code === 0) {
          this.props.updateLike(res.data);
        }
      });
    }
  }
  componentDidUpdate() {
    setTimeout(() => {
      let height = 0;
      if (this.props.activeTab === 0) {
        let videoNum = Math.ceil(this.props.myVideo.length / 3);
        if (document.getElementsByClassName("video")[0]) {
          let videoHeight = document.getElementsByClassName("video")[0]
            .offsetHeight;
          height = videoHeight * videoNum;
        }
      } else if (this.props.activeTab === 1) {
        if (document.getElementsByClassName("dynamic")[0]) {
          let dynamicHeight = document.getElementsByClassName("dynamic")[0]
            .offsetHeight;
          height = dynamicHeight;
        }
      } else if (this.props.activeTab === 2) {
        if (document.getElementsByClassName("video")[0]) {
          let likeNum = Math.ceil(this.props.like.length / 3);
          let likeHeight = document.getElementsByClassName("video")[0]
            .offsetHeight;
          height = likeNum * likeHeight;
        }
      }
      let ele = document.getElementsByClassName("slider-list")[0];
      if (height === 0) {
        height = 150;
      }
      if (ele) {
        ele.style = ele.style.cssText + "height:" + height + "px";
      }
    }, 16);
    let cookies = document.cookie.split("; ");
    let obj = {};
    for (let item of cookies) {
      let temp = item.split("=");
      obj[temp[0]] = temp[1];
    }
    if (
      (this.path === "/" || this.path === "/samecity") &&
      obj.vid !== this.props.uservid
    ) {
      axios.post("/home/videoToUser", { vid: obj.vid }).then((res) => {
        if (res.code === 0) {
          // 判断关注还是编辑资料
          if (this.path !== "/user" && res.data[0].phone !== obj.phone) {
            this.props.changePhotoCenter("关注", false);
          } else {
            this.props.changePhotoCenter("编辑资料", true);
          }
          this.props.updateData(res.data, obj.vid);
          axios
            .post("/user/upidToAllVideo", { upid: res.data[0].upid })
            .then((res) => {
              if (res.code === 0) {
                this.props.updateMyVideo(res.data);
                this.props.updateDynamic(res.data);
                axios
                  .post("user/like", { upid: res.data[0].upid })
                  .then((res) => {
                    if (res.code === 0) {
                      this.props.updateLike(res.data);
                    }
                  });
              }
            });
        }
      });
    }
  }

  onOpenChange = (...args) => {
    this.setState({ open: !this.state.open });
  };
  toRoute = (route) => {
    if (route) {
      this.props.history.push(route);
    }
  };
  setTabIndex = (num1, num2) => {
    this.props.changeTab(num2);
    setTimeout(() => {
      let height = document.getElementsByClassName("slider-list")[0].childNodes[
        num2
      ].clientHeight;
      let ele = document.getElementsByClassName("slider-list")[0];
      ele.style = ele.style.cssText + "height:" + height + "px";
    }, 0);
  };

  render() {
    const sidebar = this.props.menuList.map((item) => {
      return (
        <li
          onClick={this.toRoute.bind(this, item.route)}
          className={[
            "menu-list",
            item.borderBottom ? "border-bottom" : "",
          ].join(" ")}
          key={item.id}
        >
          <i className={"iconfont " + item.iconfont}></i>
          <span className={item.route ? "has-route" : ""}>{item.msg}</span>
        </li>
      );
    });

    return (
      <Drawer
        className="my-drawer"
        // enableDragHandle
        contentStyle={{
          color: "#A6A6A6",
          textAlign: "center",
          zIndex: 0,
          position: "absolute",
        }}
        sidebar={sidebar}
        open={!this.state.open}
        onOpenChange={this.onOpenChange}
        position="right"
      >
        <div className="user-box">
          <div
            className={[
              "swipe-handler",
              this.path === "/user" ? "hid" : "",
            ].join(" ")}
          ></div>
          <header className="user-banner">
            <img src={this.props.bannerUrl} alt="" />
            <div className="menu" onClick={this.onOpenChange}>
              <img src={menu} alt="" />
            </div>
          </header>
          <section className="user-photo">
            <div className="photo-box">
              <div className="big-circle">
                <div className="small-circle">
                  <img src={this.props.photoUrl} alt="" />
                </div>
              </div>
            </div>
            <div className="photo-center">
              <div
                className={[
                  "edit-msg",
                  !this.props.videoAuthorIsUpid ? "to-follow" : "",
                ].join(" ")}
              >
                {this.props.photoCenter}
              </div>
            </div>
            <div className="photo-right">
              <div
                className={[
                  "add-friends",
                  !this.props.videoAuthorIsUpid ? "" : "hid",
                ].join(" ")}
              >
                +&nbsp;好友
              </div>
            </div>
          </section>
          <section className="user-msg">
            <div className="msg-top">
              <div className="msg-name">{this.props.name}</div>
              <div className="msg-id">抖音号：{this.props.upid}</div>
            </div>
            <div className="msg-middle">
              <div className="msg-shop">
                <i className="iconfont icon-shangdian">&nbsp;商品橱窗</i>
              </div>
              <div className="msg-introduce">{this.props.upDescribe}</div>
              <ul className="msg-label">
                {this.props.label.map((item, index) => {
                  return (
                    <li key={item.id} className="label-item">
                      {item.tag}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="msg-footer">
              <div className="msg-my-data">
                <div className="zan">
                  <span>{this.props.zans}</span>
                  获赞
                </div>
                <div className="follow">
                  <span>{this.props.follows}</span>
                  关注
                </div>
                <div className="fans">
                  <span>{this.props.fans}</span>
                  粉丝
                </div>
              </div>
            </div>
          </section>
          <footer className="user-bottom">
            <ul className="bottom-top">
              <li
                onClick={this.props.changeTab.bind(this, 0)}
                className={[
                  "bottom-top-item",
                  this.props.activeTab === 0 ? "active" : "",
                ].join(" ")}
              >
                作品&nbsp;{this.props.myVideo.length}
              </li>
              <li
                onClick={this.props.changeTab.bind(this, 1)}
                className={[
                  "bottom-top-item",
                  this.props.activeTab === 1 ? "active" : "",
                ].join(" ")}
              >
                动态&nbsp;{this.props.dynamic.length}
              </li>
              <li
                onClick={this.props.changeTab.bind(this, 2)}
                className={[
                  "bottom-top-item",
                  this.props.activeTab === 2 ? "active" : "",
                ].join(" ")}
              >
                喜欢&nbsp;{this.props.like.length}
              </li>
            </ul>
            <WingBlank>
              <Carousel
                autoplay={false}
                infinite={false}
                dots={false}
                beforeChange={this.setTabIndex.bind(this)}
                selectedIndex={this.props.activeTab}
              >
                <ul className="my-video">
                  <VideoItem {...this.props.myVideo}></VideoItem>
                </ul>

                <ul className="dynamic">
                  <Dynamic {...this.props.dynamic}></Dynamic>
                </ul>

                <ul className="like">
                  <Like {...this.props.like}></Like>
                </ul>
              </Carousel>
            </WingBlank>
          </footer>
        </div>
      </Drawer>
    );
  }
}
function mapStateToProps(store) {
  return {
    bannerUrl: store.userReducer.bannerUrl,
    photoUrl: store.userReducer.photoUrl,
    photoCenter: store.userReducer.photoCenter,
    name: store.userReducer.name,
    upid: store.userReducer.upid,
    upDescribe: store.userReducer.upDescribe,
    label: store.userReducer.label,
    zans: store.userReducer.zans,
    follows: store.userReducer.follows,
    fans: store.userReducer.fans,
    myVideo: store.userReducer.myVideo,
    dynamicNum: store.userReducer.dynamicNum,
    likeNum: store.userReducer.likeNum,
    activeTab: store.userReducer.activeTab,
    menuList: store.userReducer.menuList,
    dynamic: store.userReducer.dynamic,
    like: store.userReducer.like,

    uservid: store.userReducer.userVid,

    videoAuthorIsUpid: store.userReducer.videoAuthorIsUpid,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeTab: (tab) => {
      dispatch(ChangeTab(tab));
    },
    updateData: (data, userVid) => {
      dispatch(updateData(data, userVid));
    },
    changePhotoCenter: (data, bool) => {
      dispatch(changePhotoCenter(data, bool));
    },
    updateMyVideo: (myVideo) => {
      dispatch(updateMyVideo(myVideo));
    },
    updateDynamic: (myVideo) => {
      dispatch(updateDynamic(myVideo));
    },
    updateLike: (like) => {
      dispatch(updateLike(like));
    },
    ChangeUserCheckUpdate: (data) => {
      dispatch(ChangeUserCheckUpdate(data));
    },
  };
}

class VideoItem extends Component {
  render() {
    let video = [];
    for (let i in this.props) {
      video.push(this.props[i]);
    }
    return video.map((item, index) => {
      return (
        <div key={item.id} className="video">
          <div className="img-box">
            <img src={item.img} alt="" />
          </div>
          <div className="player">
            <i className="iconfont icon-icon--"></i>
            <span>{item.player}</span>
          </div>
          <div className={["to-home", this.props.videoToHome ? "show" : ""]}>
            {/* <Home
              sameCityVideoList={[]}
              videoIndex={0}
            ></Home> */}
          </div>
        </div>
      );
    });
  }
}

class Dynamic extends Component {
  render() {
    let dynamic = [];
    for (let i in this.props) {
      dynamic.push(this.props[i]);
    }
    return dynamic.map((item, index) => {
      return (
        <li key={item.id} className="dynamic-list">
          <div className="list-top">
            <div className="photo">
              <img src={item.photo} alt="" />
            </div>
            <div className="name">{item.name}</div>
          </div>
          <div className="list-middle">
            <div className="video">
              <img src={item.videoImg} alt="" />
              <i className="iconfont icon-dilanxianxingiconyihuifu_huabanfuben"></i>
              <div className="video-msg">{item.msg}</div>
              <em className="iconfont icon-zanting"></em>
            </div>
          </div>
          <div className="list-footer">
            <div className="footer-top">
              <span className="date">{item.date}</span>
              <div className="right">
                <span className="more">
                  <i className="iconfont icon-19"></i>更多
                </span>
                <span className="community">
                  <i className="iconfont icon-pinglun"></i>评论
                </span>
                <span className="zan">
                  <i className="iconfont icon-aixin_shixin"></i>赞
                </span>
              </div>
            </div>
            <div className="footer-middle">{item.zan}人赞过</div>
            <div className="footer-bottom">
              <i className="iconfont icon-bi"></i>
              <input type="text" placeholder="添加评论……" />
            </div>
          </div>
        </li>
      );
    });
  }
}

class Like extends Component {
  render() {
    let like = [];
    for (let i in this.props) {
      like.push(this.props[i]);
    }
    return like.map((item, index) => {
      return (
        <li key={item.id} className="like">
          <img src={item.img} alt="" />
          <div className="player">
            <i className="iconfont icon-icon--"></i>
            <span>{item.player}</span>
          </div>
        </li>
      );
    });
  }
}

const User = connect(mapStateToProps, mapDispatchToProps)(index);
export default withRouter(User);
