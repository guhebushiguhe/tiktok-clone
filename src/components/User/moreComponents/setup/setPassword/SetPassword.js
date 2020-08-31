import React, { Component } from 'react'
import styles from './SetPassword.module.scss'
import {withRouter} from 'react-router-dom'

class SetPassword extends Component {
  state={
    password:"",
  }
  close=()=>{
    window.history.back(-1)
  }
  changePassword(value){
    this.setState({
      password:value
    })
  }
  verification(){
    let judge=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/.test(this.state.password)
      console.log(judge)
    if(judge){
      document.getElementById("rule").style.display="none"
      this.props.history.push('/user/codePassword')
      document.cookie="pw="+this.state.password
    }else{
      document.getElementById("rule").style.display="block"
    }
  }
  render() {
    return (
      <div className={styles.loginBox}>
        <div className={styles.login}>
          {/* 头部 */}
          <div className={styles.header} onClick={this.close}>
            <i className={"iconfont icon-zuojiantou "+styles.close}></i>
          </div>
          {/* 设置密码 */}
          <div className={styles.con}>
            <h3>请输入新登录密码</h3>
            <p>密码长度8-20个字符，至少1个字母，1个数字和1个特殊字符</p>
            <div className={styles.inp}>
              <input className={styles.pw} 
                value={this.state.password}
                type="password"
                placeholder="请输入密码"
                // value={this.props.password}
                onChange={(e) => {
                    this.changePassword(e.target.value)
                    if(e.target.value.length>8&&e.target.value.length<20){
                      document.getElementById("btn").style.background="#fe2b54"
                    }else{
                      document.getElementById("btn").style.background="#d8d8d8"
                    }
                  }
                }
                  // onBlur={(e)=>{
                  //   if(e.target.value.length>10||e.target.value.length<5){
                  //     document.getElementById("passwarning").style.cssText="display:block;color:red;"
                  //   }else{
                  //     document.getElementById("passwarning").style.display="none"
                  //   }
                  // }}
              ></input>
            </div>
            <p id="rule" className={styles.rule}>请按照规则填写密码！</p>
            <p>通过短信验证可以使用新密码</p>
            <div id="btn" className={styles.btn} onClick={() => {
              this.verification()
            }
            }>获取短信验证码</div>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(SetPassword)
