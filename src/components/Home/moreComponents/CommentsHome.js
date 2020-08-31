import React, { Component } from "react";
import { Fun1, Fun2 } from "../../../store/homeStore/action";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom"
import axios from '../../../unit/index'
import './CommentsHome.scss'

// import Swiper from "swiper/swiper.cjs.js"
// import "swiper/swiper.scss"


class index extends Component {
    constructor(props){
        super(props)
        this.state={
          commentList:[]  // 评论列表
        }
    }

    componentDidMount(){
      this.resetCommentList("001")
    }
  componentDidUpdate(preProps){
    if(!this.props.vid)return
    if(preProps.vid===this.props.vid)return
    this.resetCommentList(this.props.vid)

  }
  // 评论点赞
  handleCommentZan=(id)=>{
    let newCommentList = [...this.state.commentList]
    newCommentList.forEach((item)=>{
      if(item.communityId===id){
        item.liked = !item.liked
      }
    })
    this.setState({
      commentList: newCommentList
    },()=>{
    })
  }

  // 更新评论列表
  resetCommentList=(vid)=>{
    axios.post("/home/videoCommunity",{vid})
    .then(res=>{
      this.setState({
        commentList:res.data
      })
    }).catch(err=>{
    })
    // 处理axios请求到的信息
    let newCommentList = [...this.state.commentList]
    newCommentList.map(item=>(
      Object.assign(item,{liked: false})
    ))
    this.setState({
      commentList: newCommentList
    })
  }

  // 换算赞
  setZans=(zans)=>{
    if(zans===0) return ""
    if(zans>=100000000) return (parseInt(zans/1000000))/100+" e"
    if(zans>=10000) return (parseInt(zans/100))/100+" w"
    return zans
  }

  // 提交评论
  submitComment=(e)=>{
    if(e.keyCode===13){
      axios.post("/home/communityToVideo",{
        communityId: this.props.userId,
        upid: this.props.upid,
        vid: this.props.vid,
        communityMsg: e.currentTarget.value
      }).then(res=>{
      }).catch(err=>{
      })
      this.resetCommentList(this.props.vid)
      e.currentTarget.value = ""
    }
  
  }
    render() {
      let {handleCommentHome} = this.props
    return (
        <div className="commentWrap">
          <div className="commentHeader">
            <p className="commentTitle"> {this.state.commentList.length} 条评论</p>
            <button className="iconfont exitBtn" onClick={handleCommentHome}>×</button>
          </div>
          <div className="commentContainer">
            <ul className="commentList">
              {this.state.commentList.length===0?"":
              (this.state.commentList.map((item,index)=>
              <li className="commentItem" key={index}>
                <img className="commentAva" alt="" src={item.photoUrl} />
                <div className="commentContent">
                  <div className="commentName"> {item.name} </div>
                  <div className="commentText"> {item.communityMsg} </div>
                  <div className="commentTime"> {item.userCreateTime} </div>
                </div>
                <div className={`zansBox  ${item.liked?"liked":""}`} onClick={()=>{this.handleCommentZan(index)}}>
                  <i className="iconfont icon-aixin"></i>
                  <span className="ZanNum"> {this.setZans(item.zans)} </span>
                </div>
              </li>
              ))
              }
            <div className="commentBox">
              <input className="commentInput" placeholder="留下你的精彩评论吧" onKeyDown={this.submitComment}></input>
              <i className="iconfont icon-at"></i>
              <i className="iconfont icon-smiling"></i>
            </div>
            </ul>
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

const CommentsHome = connect(mapStateToProps, mapDispatchToProps)(index);

export default withRouter(CommentsHome);



