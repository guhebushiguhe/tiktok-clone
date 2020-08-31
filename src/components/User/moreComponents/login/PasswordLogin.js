import React, { Component } from 'react'
import styles from './PasswordLogin.module.scss'
import { withRouter } from "react-router-dom";
import {changephone,changePassword} from '../../../../store/userStore/action'
import {connect} from 'react-redux'
import axios from '../../../../unit'

class passwordLogin extends Component {
  back=()=>{
    window.history.back(-1)
  }
  signIn=()=>{
    document.getElementById("err").style.display="none"
    if(/^[0-9]+?$/.test(this.props.phone)&&8<=this.props.password.length&&this.props.password.length<=20){
      console.log(111)
      axios.post("/user/passwordLogin",{phone:this.props.phone,password:this.props.password}).then(res=>{
        console.log(res)
        if(res.code===0){
          window.localStorage.setItem("phone",this.props.phone)
          document.cookie="phone="+this.props.phone;
          this.props.changephone("")
          this.props.changePassword("")
          this.props.history.push('/')
        }else{
          document.getElementById("err").style.cssText="display:block;color:red;"
        }
      }).catch(error=>{
        console.log(error)
      })
    }else{
      if(document.getElementById("warning").style.display==="block"||this.props.phone===""){
        document.getElementById("phone").focus()
        document.getElementById("warning").style.cssText="display:block;color:red;"
      }else if( document.getElementById("passwarning").style.display==="block"||this.props.password===""){
        document.getElementById("password").focus()
        document.getElementById("passwarning").style.cssText="display:block;color:red;"
      }
    }
  }
  componentDidMount(){
    this.props.changephone("")
    this.props.changePassword("")
  }
  render() {
    return (
      <div className={styles.loginBox}>
        <div className={styles.login}>
          {/* 头部 */}
          <div className={styles.header} onClick={this.back}>
            <i className={"iconfont icon-zuojiantou "+styles.close}></i>
            <span>帮助</span>
          </div>
          {/* 中间信息 */}
          <div className={styles.obtain}>
            <h5>手机号密码登录</h5>
            {/* 本机号码一键登录 */}
            <div className={styles.SignIn}>
              <div className={styles.phoneNum}>
                <div className={styles.phoneNumLeft}>
                  <span className={styles.countryNum}>+86</span>
                  <i className="iconfont icon-xiajiantou"></i>
                </div>
                <div className={styles.inputPhone}>
                  <input id="phone" type="text" placeholder="请输入手机号"
                    autoComplete="off"
                    value={this.props.phone}
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
              <p id="warning" className={styles.warning}>手机号码长度应为11位，请重新填写!</p>
              <div className={styles.password}>
                <input id="password" type="password" placeholder="请输入密码"
                  value={this.props.password}
                  onChange={(e) => {
                      this.props.changePassword(e.target.value)
                      if(e.target.value.length>20){
                        document.getElementById("passwarning").style.cssText="display:block;color:red;"
                      }else{
                        document.getElementById("passwarning").style.display="none"
                      }
                    }
                  }
                  onBlur={(e)=>{
                    if(e.target.value.length>20||e.target.value.length<8){
                      document.getElementById("passwarning").style.cssText="display:block;color:red;"
                    }else{
                      document.getElementById("passwarning").style.display="none"
                    }
                  }}
                ></input>
              </div>
              <p id="passwarning" className={styles.warning}>密码长度8-20个字符，至少1个字母，1个数字和1个特殊字符</p>
              <div className={styles.message}>
                <div className={styles.tickBtn}></div>
                <p>
                  我已阅读并同意
                  <span>用户协议</span>
                  和
                  <span>隐私政策</span>
                </p>
              </div>
              <div id="err" className={styles.warning}>手机号或密码错误,请重新填写！</div>
              <div id="btn" className={styles.btn} onClick={() => {
                this.signIn()
              }
              }>登录</div>
            </div>
            {/* 底部 */}
            <div className={styles.bottom}>
              <p>
                忘记了？
                <span onClick={this.login}>找回密码</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps=(state) => {
  return {
    phone:state.userReducer.phone,
    password:state.userReducer.password,
  }
}
const mapDispatchToProps=(dispatch) => {
  return {
    changephone:(value) => {
      dispatch(changephone(value))
    },
    changePassword:(value) => {
      dispatch(changePassword(value))
    },
    // empty:(value) => {
    //   dispatch(empty(value))
    // }
    
  }
}
const pwl=connect(mapStateToProps,mapDispatchToProps)(passwordLogin)
export default withRouter(pwl);
