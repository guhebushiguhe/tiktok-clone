import React, { Component } from "react";
import { Fun1, Fun2 } from "../../../store/homeStore/action";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom"
import "./VideoFooter.scss";

class index extends Component {
  render(props) {
    return (
      <div className="videoFooter">
          {(()=>{
            let {videoName,videoCity,describe,musicDescribe} = this.props
            return(
              <div className="footerContainer">
                <div className="positionBox">
                  <i className="iconfont icon-weizhi"></i>
                  <span className="position">{videoCity}</span>
                </div>
                <p className="upId">@ {videoName}</p>
                <p className="describe"> {describe} </p>
                  <img className="musicDescribeImg" alt="" src={require("../../../assets/images/home/tiktok-music.svg")}/>&nbsp;
                <span className="musicDescribeBox">
                  <span className="musicDescribe"> {musicDescribe} </span>
                </span>
              </div>
            )
            })()}
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

const VideoFooter = connect(mapStateToProps, mapDispatchToProps)(index);

export default withRouter(VideoFooter);