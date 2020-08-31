import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "../../../../unit";

class index extends Component {
  componentDidMount() {
    let cookies = document.cookie.split("; ");
    let obj = {};
    for (let item of cookies) {
      let temp = item.split("=");
      obj[temp[0]] = temp[1];
    }
    // 有cookie
    if (obj.phone) {
      // 有localStorage
      this.props.history.push("/user");
    } else {
      if (window.localStorage.phone) {
        // 没有cookie，有localStorage
        this.props.history.push("/user/login");
      } else {
        // 没有cookie，没有localStorage
        this.props.history.push("/user/smslogin");
      }
    }
  }
  render() {
    return <div></div>;
  }
}

export default withRouter(index);
