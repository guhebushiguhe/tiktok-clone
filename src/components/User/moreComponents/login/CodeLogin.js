import React, { Component } from "react";
import styles from "./CodeLogin.module.scss";
import { withRouter } from "react-router-dom";
import axios from "../../../../unit";
import { connect } from "react-redux";

class CodeLogin extends Component {
  back = () => {
    window.history.back(-1);
  };
  login = () => {
    const code = document.getElementById("code").value;
    if (code === "123") {
      axios
        .post("/user/login", { phone: this.props.finPhone, checkCode: code })
        .then((res) => {
          console.log(res);
          document.cookie = "phone=" + this.props.finPhone;
          localStorage.setItem("phone",this.props.finPhone);
          axios.post("/user/getUserMsg", { phone: this.props.finPhone }).then((res) => {
            if (res.code === 0) {
              document.cookie = "upid=" + res.data[0].upid;
            }
          });
          this.props.history.push("/");
        });
    } else {
      alert("验证码错误！请重新输入验证码");
    }
  };
  render() {
    return (
      <div className={styles.loginBox}>
        <div className={styles.login}>
          {/* 头部 */}
          <div className={styles.header} onClick={this.back}>
            <i className={"iconfont icon-zuojiantou " + styles.close}></i>
            <span>帮助</span>
          </div>
          {/* 中间信息 */}
          <div className={styles.obtain}>
            <h5>请输入验证码</h5>
            <p>验证码已通过短信发送至+86 {this.props.finPhone}</p>
            {/* 本机号码一键登录 */}
            <div className={styles.SignIn}>
              <div className={styles.phoneNum}>
                <div className={styles.input}>
                  <input
                    id="code"
                    type="number"
                    placeholder="请输入验证码"
                    defaultValue="123"
                  ></input>
                  {/* <span>{60}</span> */}
                </div>
              </div>
              <div className={styles.btn} onClick={this.login}>
                登录
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    finPhone: state.userReducer.finPhone,
  };
};
const codeLogin = connect(mapStateToProps, null)(CodeLogin);
export default withRouter(codeLogin);
