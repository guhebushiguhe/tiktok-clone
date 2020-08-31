import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../../sass/BottomTab.scss";
// import CenterButton from "./CenterButton";
import centerButton from "../../assets/images/centerButton.png";

import axios from "../../unit";

export default class Index extends Component {
  test = () => {
    let data = {upid: "32423432",toFollow:"13124422",from:"推荐视频"};
    axios.post("/home/cancelFollow", data).then((res) => {
    });
  };

  render() {
    return (
      <div className="big-box">
        <div className="con-box">{this.props.children}</div>
        <div className="tab">
          <NavLink exact to="/" activeClassName="tab-active">
            <span>首页</span>
          </NavLink>
          <NavLink exact to="/samecity" activeClassName="tab-active">
            <span>同城</span>
          </NavLink>
          <div className="center-button-box" onClick={this.test}>
            <img alt=" " src={centerButton} className="center-button"></img>
          </div>
          <NavLink exact to="/message" activeClassName="tab-active">
            <span>消息</span>
          </NavLink>
          <NavLink exact to="/checkstatus" activeClassName="tab-active">
            <span>我</span>
          </NavLink>
        </div>
        <div className="video"></div>
      </div>
    );
  }
}
