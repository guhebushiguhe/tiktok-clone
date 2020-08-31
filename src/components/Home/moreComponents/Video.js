import React, { Component } from "react";
import { Fun1, Fun2 } from "../../../store/homeStore/action";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom"
import VideoFooter from './VideoFooter'
import VideoSideBar from './VideoSideBar'
import "./Video.scss";

// import Swiper from "swiper/swiper.cjs.js"
import "swiper/swiper.scss"


class index extends Component {
    constructor(props){
        super(props)
        this.state={
            isPlaying: false,
            horizontalSwiper: null,
            curVideoRef: ""
        }
    }
    // 点击播放/暂停视频
    onVideoPress=(refStr)=>{
        if(this.state.isPlaying){
            this.refs[refStr].pause()
            this.setState({
                isPlaying: false
            })
        }else if(!this.state.isPlaying){
            this.refs[refStr].play()
            this.setState({
                isPlaying: true
            })
        }
    }

    componentDidMount(){
      // 获取视频播放器ref到全局
      this.setState({
        curVideoRef:this.props.refStr
      })
    }
    componentDidUpdate(preProps){
      // 全屏滑动自动播放
      let{prePage,nextPage}=this.props

      // 刚刷新没有preProps
      if(isNaN(prePage) || isNaN(nextPage))return

      // 如果纵向没有滑动,则不执行自动播放(防止点击播放暂停被此处重置)
      if (prePage===preProps.prePage && nextPage===preProps.nextPage)return
      // 自动播放
      function autoplay(prePage,nextPage) {
        if(nextPage===0 || prePage===0)return
        let nextPageStr = "video"+nextPage
        let prePageStr = "video"+prePage
        if(this.refs[prePageStr]){
          this.refs[prePageStr].pause()
          // 切换页面重置播放时间
          this.refs[prePageStr].currentTime = 0
          // 防死循环
          if(!this.state.isPlaying)return
          this.setState({
            isPlaying: false
        })
        }
        if(this.refs[nextPageStr]){
          this.refs[nextPageStr].play()
          // 防死循环
          if(this.state.isPlaying)return
          this.setState({
            isPlaying: true
        })
        }
      }
      autoplay.bind(this,prePage,nextPage)()
    }
    render() {
      let {videoSrc,refStr,nextPage,pageIndex,videoFillType} = this.props

    return (
        <div className="videoWrap">
        <div className="videoContainer">
              <div className="videoBox">
              {/* 载入动画开始 */}
              <div className="content">
                <div className="loading">
                    <p>载入中...</p><span></span>
                </div>
              </div>
              {/* 载入动画结束 */}
              <div className="swipe-handler">
                  <video
                  className={`videoPlayer ${videoFillType?"":"fill"}`}
                  onClick={this.onVideoPress.bind(this,refStr)}
                  loop
                  ref={refStr}
                  src={(nextPage===pageIndex || nextPage-1===pageIndex || nextPage-2===pageIndex)?require(`../../../${videoSrc}`):""}
                  ></video>
                </div>
                  <VideoFooter
                  {...this.props}
                  ></VideoFooter>
                  <VideoSideBar
                  {...this.props}
                  ></VideoSideBar>
              </div>
          </div>
      </div>
    )
  }
}
function mapStateToProps(store) {
  return {
    // 示例
    value: store.homeReducer.value,
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
  };
}

const Video = connect(mapStateToProps, mapDispatchToProps)(index);

export default withRouter(Video);



