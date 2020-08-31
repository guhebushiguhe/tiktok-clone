import React, { Component } from "react";
import { Fun1, Fun2 } from "../../../store/homeStore/action";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom"
import axios from '../../../unit'
import "./VideoSideBar.scss";

class index extends Component {

  // 给视频点赞
  submitZan=(zanId,upId,vid)=>{
    axios.post("/home/zanToVideo",{
      zanId,
      upid: upId,
      vid
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
    this.props.setHomeZan(vid,true)
  }
  // 视频取消点赞
  cancleZan=(zanId,vid)=>{
    console.log("取消点赞:",zanId,vid)
    this.props.setHomeZan(vid,false)
  }
  render() {
    let {photoUrl,upId,liked,zanCount,commentCount,shareCount,handleLike,handleCommentHome,vid,zaned,nextPage,pageIndex} = this.props
    // photoUrl = "../../../assets/images/home/"+photoUrl
    if(zanCount>10000){
      zanCount = parseInt(zanCount/100)/100+" w"
    }
    if(commentCount>10000){
      commentCount = parseInt(commentCount/100)/100+" w"
    }
    if(shareCount>10000){
      shareCount = parseInt(shareCount/100)/100+" w"
    }
    return (
        <div className="videoSideBar">
            <div className="avaBox">
              <img alt="" src={(nextPage===pageIndex || nextPage-1===pageIndex || nextPage-2===pageIndex)?require(`../../../${photoUrl}`):""} className={`avaImg ${liked?"liked":"unlike"}`}/>
              <span className={`iconfont ${liked?"icon-icon":"icon-jiahao"} follow`} onClick={()=>{handleLike(upId)}}></span>
            </div>
            <div className={`likedCounterBox ${zaned?"zaned":""}`} onClick={zaned?this.cancleZan.bind(this,this.props.userId,vid):this.submitZan.bind(this,this.props.userId,upId,vid)}>
              <span className="iconfont icon-aixin"></span>
              <span className="likedNum"> {zanCount} </span>
            </div>
            <div className="commentCounterBox">
              <span className="iconfont icon-pinglun" onClick={handleCommentHome}></span>
              <span className="commentNum"> {commentCount} </span>
            </div>
            <div className="shareCounterBox" onClick={this.props.showShareActionSheetMulpitleLine}>
              <span className="iconfont icon-fenxiang"></span>
              <span className="shareNum"> {shareCount} </span>
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

const VideoSideBar = connect(mapStateToProps, mapDispatchToProps)(index);

export default withRouter(VideoSideBar);