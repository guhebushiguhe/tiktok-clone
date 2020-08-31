import React, { Component } from "react";
import styles from "./SMSLogin.module.scss";
import { withRouter } from "react-router-dom";
import {changephone,gsvc} from '../../../../store/userStore/action'
import {connect} from 'react-redux'

class SMSLogin extends Component {
  back = () => {
    this.props.history.push("/")
  };

  passwordlogin = () => {
    this.props.history.push("/user/passwordlogin");
  };
  componentDidMount(){
    this.props.changephone("")
  }

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
            <h5>登录后即可展示自己</h5>
            <p>
              登录即表明同意
              <span>用户协议</span>和<span>隐私政策</span>
            </p>
            {/* 本机号码一键登录 */}
            <div className={styles.SignIn}>
              <div className={styles.phoneNum}>
                <div className={styles.phoneNumLeft}>
                  <span className={styles.countryNum}>+86</span>
                  <i className="iconfont icon-xiajiantou"></i>
                </div>
                <div className={styles.input}>
                  <input
                    id="phone"
                    type="text"
                    placeholder="请输入手机号"
                    autoComplete="off"
                    value={this.props.phone||""}
                    onChange={(e) => {
                      this.props.changephone(e.target.value)
                    }
                    }
                    onBlur={(e) => {
                      if (!/^1[3456789]\d{9}$/.test(e.target.value)) {
                        document.getElementById("warning").style.cssText="display:block;color:red;"
                      }else{
                        document.getElementById("warning").style.display="none"
                      }
                    }}
                  ></input>
                </div>
              </div>
              <p id="warning" className={styles.warning}>手机号码有误，请重新填写!</p>
              <div className={styles.message}>
                未注册的手机号验证通过后将自动注册
              </div>
              <div id="btn" className={styles.btn} onClick={() => {
                if(this.props.phone.length===11&&/^1[3456789]\d{9}$/.test(this.props.phone)){
                  this.props.gsvc(this.props.phone)
                  
                  this.props.history.push("/user/codelogin");
                }else{
                  document.getElementById("warning").style.cssText="display:block;color:red;"
                  document.getElementById("phone").focus()
                  return false
                }
              }
              }>
                获取短信验证码
              </div>
            </div>
            {/* 底部 */}
            <div className={styles.bottom}>
              <span onClick={this.passwordlogin}>密码登录</span>
              <span onClick={this.login}>其他方式登录</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps=(state) => {
  return {
    phone:state.userReducer.phone
  }
}
const mapDispatchToProps=(dispatch) => {
  return {
    changephone:(value) => {
      dispatch(changephone(value))
    },
    gsvc:(phone) => {
      dispatch(gsvc(phone))
    }
    
  }
}
const smlLogin=connect(mapStateToProps,mapDispatchToProps)(SMSLogin)
export default withRouter(smlLogin);
