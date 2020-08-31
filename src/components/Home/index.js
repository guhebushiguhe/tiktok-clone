import React, { Component } from "react";
import { Fun1, Fun2 } from "../../store/homeStore/action.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../../sass/BottomTab.scss";
import "../../sass/Home.scss";
import Video from "./moreComponents/Video";
import User from "../User";
import CommentsHome from "./moreComponents/CommentsHome";
import axios from "../../unit";
import { ActionSheet } from "antd-mobile";

import { freshUser } from "../../store/userStore/action";


import Swiper from "swiper";
import "swiper/swiper.scss";

const isIPhone = new RegExp("\\biPhone\\b|\\biPod\\b", "i").test(
  window.navigator.userAgent
);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: (e) => e.preventDefault(),
  };
}

class index extends Component {
  constructor() {
    super();
    this.initPage = 2; // 初始化显示页
    this.verticalSwiper = null; // 初始化纵向轮播图
    this.horizontalSwiper = null; // 初始化横向轮播图
    this.state = {
      prePage: 0, // 当前页索引(从1开始)
      nextPage: 0, // 滑动到下一页索引(从1开始)
      curPage: this.initPage, // 当前要显示的页面
      couldSlidePage: true, // 是否允许全屏上下滑动
      verticalSwiper: null, // 垂直轮播图
      horizontalSwiper: null, // 水平轮播图初始化
      isCommentsHomeShow: false, // 是否显示首页评论
      isFullScreen: false, //是否全屏显示
      renderVideo: false,
      userId: 0, // 登录用户ID
      // videoFillType: 0, // 视频填充样式(0:拉伸,1:按比例填充)

      clicked: "none",
      clicked1: "none",
      clicked2: "none",

      // 推荐视频列表(全部显示)
      videoList: [],
    };
  }
  componentDidMount() {
    // 获取登录用户id
    let cookies = document.cookie.split("; ");
    let obj = {};
    for (let item of cookies) {
      let temp = item.split("=");
      obj[temp[0]] = temp[1];
    }
    axios
      .post("/user/getUserMsg", { phone: obj.phone })
      .then((res) => {
        this.setState({
          userId: res.data[0].upid,
        });
      })
      .catch((err) => {});

    document.cookie = "vid=001";
    // 主动请求首页推荐视频列表
    this.setState({
      renderVideo: false,
    });
    axios
      .get("/home/allVideo")
      .then((res) => {
        console.log(res);
        let videoList = res["data"].map(item=>Object.assign(item,{zaned: false,videoFillType: 1}))
        // 替换服务器资源地址为静态地址
        let newVideoList = videoList.map(item=>Object.assign(item,{
          photoUrl: item.photoUrl.replace("http://42.194.186.54/tiktok-assets","assets"),
          videoCover: item.videoCover.replace("http://42.194.186.54/tiktok-assets","assets"),
          videoSrc: item.videoSrc.replace("http://42.194.186.54/tiktok-assets","assets")
        }))
        this.setState(
          {
            videoList: newVideoList,
            renderVideo: true,
          },
          () => {
            this.setVSwiper();
            if(this.props.match.path==="/"){
              document.querySelectorAll("video")[0].play()
            }
          }
        );
      })
      .catch((err) => {});

    // 横向轮播图初始化(新)
    let that = this;
    this.horizontalSwiper = new Swiper(`.swiper-container-h`, {
      // direction: 'vertical', // 垂直切换选项
      direction: "horizontal", // 水平切换选项
      loop: false, // 循环模式选项
      // stopPropagation: false,
      swipeHandler: ".swipe-handler", // 只能拖动这里滑动
      allowSlidePrev: false, // 是否允许向左滑动
      allowSlideNext: true, // 是否允许向左滑动
      on: {
        transitionEnd: function (swiper) {
          if (this.activeIndex) {
            let cookies = document.cookie.split("; ");
            let obj = {};
            for (let item of cookies) {
              let temp = item.split("=");
              obj[temp[0]] = temp[1];
            }
            that.props.freshUser(obj.vid);
          }
          // 查看用户页时暂停视频，切回来继续播放
          if (this.activeIndex === 1) {
            document.querySelectorAll("video")[that.state.nextPage - 1].pause();
            this.allowSlideNext = false;
            this.allowSlidePrev = true;
          }
          if (this.activeIndex === 0) {
            document.querySelectorAll("video")[that.state.nextPage - 1].play();
            this.allowSlideNext = true;
            this.allowSlidePrev = false;
          }
        },
      },
    });
  }

  shouldComponentUpdate(nextProps){
    return nextProps.videoList!==this.state.videoList
  }
  componentDidUpdate(preProps) {
    // 获取外部传来的播放列表进行渲染
    if(this.props.sameCityVideoList===preProps.sameCityVideoList && this.props.videoIndex===preProps.videoIndex ) return
      if(this.props.sameCityVideoList.length>=1){
        this.setState({
          videoList: this.props.sameCityVideoList,
          curPage: this.props.videoIndex
        },()=>{
          if(this.props.videoIndex===999)return
          this.verticalSwiper.slideTo(this.props.videoIndex, 100, false);
        }
      );
    }
    // }
  }

  // 修改单个视频赞信息
  setHomeZan=(vid,zan)=>{
    let newVideoList = [...this.state.videoList]
    newVideoList.forEach(item=>{item.zaned=zan})
    this.setState({
      videoList: newVideoList,
    });
  };

  // 初始化纵向轮播图
  setVSwiper=()=>{
    let that = this
    this.verticalSwiper = new Swiper ('.swiper-container-v', {
      direction: 'vertical', // 垂直切换选项
      // direction: 'horizontal', // 水平切换选项
      loop: false, // 循环模式选项
      initialSlide: 0, // 初始化播放索引
      virtual: true,
      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      on: {
        transitionEnd: function (swiper) {
          that.setState(
            {
              prePage: this.previousIndex + 1,
              nextPage: this.realIndex + 1,
            },
            () => {
              that.setUpId(this.realIndex);
              setTimeout(()=>{
                that.setFillType(this.realIndex)
              },1000)
            }
          );
        },
      },
    })

    this.setState({
      prePage: this.verticalSwiper.previousIndex,
      nextPage: this.verticalSwiper.realIndex+1
    })
  }

  // 设置视频填充格式
  setFillType=(realIndex)=>{
    let newVideoList = [...this.state.videoList]
    let indexArr = [realIndex-1,realIndex,realIndex+1]
    let video = document.querySelectorAll("video")
    indexArr.forEach(i=>{
      if(i<0 || i>video.length-1)return
      // console.log(video.videoHeight,video.videoWidth)
      if(video[i].videoHeight/video[i].videoWidth > 1.7 && video[i].videoHeight/video[i].videoWidth < 2){
        newVideoList[i].videoFillType=0
      }else{
        newVideoList[i].videoFillType=1
      }
    })
    this.setState({
      videoList: newVideoList
    },()=>{
      // console.log("设置videoFillType完毕",this.state.videoList)
    })
  }

  // 垂直翻页视频时记录 vid 到 cookie
  setUpId = (index) => {
    let vid = this.state.videoList[index].vid;
    document.cookie = "vid=" + vid;
  };

  setUpId = (index) => {
    let vid = this.state.videoList[index].vid;
    document.cookie = "vid=" + vid;
    // this.props.freshUser();
  };

  // 设置两端轮播图不能向外滑动
  setSideSlidable = (allowHSlidePrev, allowHSlideNext) => {
    this.horizontalSwiper.allowSlidePrev = allowHSlidePrev;
    this.horizontalSwiper.allowSlideNext = allowHSlideNext;
  };

  // 设置关注
  handleLike = (id) => {
    this.state.videoList.forEach(({ upId, liked }, index) => {
      if (upId === id) {
        let newVideoList = [...this.state.videoList];
        newVideoList[index].liked = !liked;
        this.setState({
          videoList: newVideoList,
        });
      }
    });
  };

  // 设置评论窗口是否显示
  handleCommentHome = (e) => {
    let event = window.event || e;
    event.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      isCommentsHomeShow: !this.state.isCommentsHomeShow,
    });
  };

  // 自动全屏事件(必须人为触发,不能自动执行)
  handleFullScreen = () => {
    var docElm = document.documentElement;
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.msRequestFullscreen) {
      docElm = document.body; //overwrite the element (for IE)
      docElm.msRequestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    } else return;
    this.setState({
      isFullScreen: true,
    });
  };

  // 取消全屏事件
  handleCancelFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
    this.setState({
      isFullScreen: false,
    });
  };

  // 分享模块相关

  dataList = [
    { url: "001", title: "" },
    { url: "002", title: "" },
    { url: "003", title: "" },
    { url: "004", title: "" },
    { url: "005", title: "" },
    { url: "006", title: "" },
    { url: "007", title: "" },
    { url: "008", title: "" },
    { url: "009", title: "" },
    { url: "010", title: "抖音好友" },
    { url: "015", title: "头条" },
    { url: "016", title: "新浪微博" },
    { url: "011", title: "朋友圈" },
    { url: "012", title: "微信好友" },
    { url: "014", title: "QQ" },
    { url: "013", title: "QQ空间" },
    { url: "017", title: "其他" },
    { url: "018", title: "" },
    { url: "019", title: "" },
    { url: "020", title: "" },
    { url: "021", title: "" },
    { url: "022", title: "" },
    { url: "023", title: "" },
    { url: "024", title: "" },
  ].map((obj) => ({
    icon: (
      <img
        src={`http://42.194.186.54/tiktok-assets/shareicon/shareicon_${obj.url}.svg`}
        alt={obj.title}
        style={{ width: 36 }}
      />
    ),
    title: obj.title,
  }));
  showShareActionSheetMulpitleLine = () => {
    const data = [
      [
        this.dataList[1],
        this.dataList[2],
        this.dataList[3],
        this.dataList[4],
        this.dataList[5],
        this.dataList[6],
        this.dataList[7],
        this.dataList[8],
      ],
      [
        this.dataList[9],
        this.dataList[10],
        this.dataList[11],
        this.dataList[12],
        this.dataList[13],
        this.dataList[14],
        this.dataList[15],
        this.dataList[16],
      ],
      [
        this.dataList[17],
        this.dataList[18],
        this.dataList[19],
        this.dataList[20],
        this.dataList[21],
        this.dataList[22],
        this.dataList[23],
    ] ];
    ActionSheet.showShareActionSheetWithOptions({
      options: data,
      message: '抖音,分享美好生活',
    },
    (buttonIndex, rowIndex) => {
      this.setState({ clicked2: buttonIndex > -1 ? data[rowIndex][buttonIndex].title : 'cancel' });
    });
  }


  render() {
    return (
      <div className="homeWrap">
        <div
          className="iconfont icon-quanping"
          onClick={
            this.state.isFullScreen
              ? this.handleCancelFullScreen
              : this.handleFullScreen
          }
        >
          {" "}
        </div>
        <div className="noMoreBoxTop">没有更多了···</div>
        <div className="noMoreBoxBottom">没有更多了···</div>
        <div className="appVideos">
          {/* 横向轮播图开始 */}
          <div className="swiper-container-h">
            <div className="swiper-wrapper">
              {/* <div className="swiper-slide">关注</div> */}

              <div className="swiper-slide">
                {/* 纵向轮播图(推荐视频)开始 */}
                <div
                  className="swiper-container-v"
                  style={{ height: "90vh", overflow: "hidden" }}
                >
                  {!this.state.renderVideo ? (
                    ""
                  ) : (
                    <div className="swiper-wrapper">
                      {this.state.videoList.map((item, index) => {
                        return (
                          <div key={item.vid} className="swiper-slide">
                            <Video
                              key={item.vid}
                              pageIndex={index}
                              {...item}
                              {...this.state}
                              refStr={"video" + (index + 1)}
                              pageNum={this.state.videoList.length}
                              handleLike={this.handleLike}
                              setSlidable={this.setSlidable}
                              setSideSlidable={this.setSideSlidable}
                              handleCommentHome={this.handleCommentHome}
                              updateVideoList={this.updateVideoList}
                              setHomeZan={this.setHomeZan}
                              showShareActionSheetMulpitleLine={
                                this.showShareActionSheetMulpitleLine
                              }
                            ></Video>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                {/* 纵向轮播图(推荐视频)结束 */}
              </div>

              <div className="swiper-slide">
                <div className="customerHomeBox">
                  {/* <div className="swipe-handler"></div> */}
                  <User></User>
                </div>
              </div>
            </div>
          </div>
          {/* 横向轮播图结束 */}
        </div>

        <div
          className={`commentsWrap ${
            this.state.isCommentsHomeShow ? "showComment" : ""
          }`}
        >
          <div className="exitArea" onClick={this.handleCommentHome}></div>
          <div className="commentsHomeBox">
            <CommentsHome
              handleCommentHome={this.handleCommentHome}
              {...this.state.videoList[this.state.nextPage - 1]}
              userId={this.state.userId}
            ></CommentsHome>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(store) {
  return {
    // 示例
    value: store.homeReducer.value,

    userCheckUpdate: store.userReducer.userCheckUpdate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 示例
    fun1: () => {
      dispatch(Fun1);
    },
    fun2: () => {
      dispatch(Fun2);
    },
    freshUser: (data) => {
      dispatch(freshUser(data));
    },
  };
}

const Home = connect(mapStateToProps, mapDispatchToProps)(index);

export default withRouter(Home);
