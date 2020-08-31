import React, { Component } from 'react'
import styles from './CodePassword.module.scss'
import { withRouter } from "react-router-dom";
import axios from '../../../../../unit'
import {connect} from 'react-redux'

class CodePassword extends Component {
  constructor(props){
    super(props)
    this.phone=localStorage.getItem("phone")
    this.encryption=this.phone.replace(/^(\d{3})\d{4}(\d{4})$/,"$1****$2")
    this.pw=this.getCookie("pw")
  }
  getCookie=(key)=>{
    var str = document.cookie;
    var arr = str.split('; ');
    for(var i=0;i<arr.length;i++){
      var eachArr = arr[i].split('=');
      if(eachArr[0]==key){
          return eachArr[1];
      }
    }
  }
  back=()=>{
    window.history.back(-1)
  }
  set=()=>{
    const code = document.getElementById("code").value
    if(code==="123"){
      axios.post("user/changePassword",{phone:this.phone,password:this.pw,checkCode:code}).then(res=>{
        if(res.code===0){
          window.localStorage.setItem("changePassword",localStorage.getItem("phone")+"0")
          this.props.history.push('/user/accountSecurity')
        }
      }).catch(error=>{
        alert(error)
      })
    }else{
      alert("验证码错误！请重新输入验证码")
    }
  }
  componentDidMount(){
    let data=new Date();
    data.setTime(data.getTime() - 8 * 60 * 60 * 1000 - 1000)
    document.cookie = "pw="+this.pw+";expires=" + data;
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
            <h5>请输入验证码</h5>
            <p>
              验证码已通过短信发送至+86 {this.encryption}
            </p>
            {/* 本机号码一键登录 */}
            <div className={styles.SignIn}>
              <div className={styles.phoneNum}>
                <div className={styles.input}>
                  <input id="code" type="number" placeholder="请输入验证码" defaultValue="123"></input>
                  {/* <span>{60}</span> */}
                </div>
              </div>
              <div className={styles.btn} onClick={this.set}>完成</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps=(state) => {
  return {
    finPhone:state.userReducer.finPhone
  }
}
const codeLogin=connect(mapStateToProps,null)(CodePassword)
export default withRouter(codeLogin);
