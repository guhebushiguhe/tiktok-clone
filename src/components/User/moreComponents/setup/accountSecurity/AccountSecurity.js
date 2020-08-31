import React, { Component } from "react";
import styles from "./AccountSecurity.module.scss";
// import {showMessage,hideMessage} from '../../../../store/userStore/action'
// import { connect } from "react-redux";
import {withRouter} from 'react-router-dom'

class AccountSecurity extends Component {
  constructor(props){
    super(props)
    this.locaPhone=localStorage.getItem("phone");
    this.encryption=this.locaPhone.replace(/^(\d{3})\d{4}(\d{4})$/,"$1****$2")
    this.setPassword="未设置"
    if(localStorage.getItem("changePassword")===(localStorage.getItem("phone")+"0")){
      this.setPassword="已设置"
    }
  }
  backtrack=()=>{
    this.props.history.push("/user/setup")
  }
  setDmPassword=()=>{
    this.props.history.push('/user/setPassword')
  }
  render() {
    return (
      <div>
        <div className={styles.account}>
          {/* 设置的头部 */}
          <div className={styles.accountHeader}>
            <div className={styles.iconBox} onClick={()=>this.backtrack()}>
              <i className={"iconfont icon-zuojiantou " + styles.iconcolor}></i>
            </div>
            <h2 className={styles.title}>账号与安全</h2>
          </div>
          {/* 设置的item */}
          <div className={styles.con}>
            <div className={styles.itemBox}>
              <div className={styles.accountItemLeft}>
                <span className={styles.leftTit}>抖某号</span>
              </div>
              <div className={styles.accountItemRight}>
                <span>{this.locaPhone}</span>
              </div>
            </div>
            <div className={styles.itemBox}>
              <div className={styles.accountItemLeft}>
                <span className={styles.leftTit}>我的抖音码</span>
              </div>
              <div className={styles.accountItemRight}>
                <i className="iconfont icon-gengduo"></i>
              </div>
            </div>
            <div className={styles.itemBox}>
              <div className={styles.accountItemLeft}>
                <span className={styles.leftTit}>手机绑定</span>
              </div>
              <div className={styles.accountItemRight}>
                <i className="iconfont icon-lock"></i>
                <span>{this.encryption}</span>
                <i className="iconfont icon-gengduo"></i>
              </div>
            </div>
            <div className={styles.itemBox}>
              <div className={styles.accountItemLeft}>
                <span className={styles.leftTit}>第三方账号绑定</span>
              </div>
              <div className={styles.accountItemRight}>
                <i className="iconfont icon-gengduo"></i>
              </div>
            </div>
            <div className={styles.itemBox}>
              <div className={styles.accountItemLeft}>
                <span className={styles.leftTit}>授权管理</span>
              </div>
              <div className={styles.accountItemRight}>
                <i className="iconfont icon-gengduo"></i>
              </div>
            </div>
            <div className={styles.itemBox} onClick={() => {
              this.setDmPassword()
            }
            }>
              <div className={styles.accountItemLeft}>
                <span className={styles.leftTit}>抖某密码</span>
              </div>
              <div className={styles.accountItemRight}>
                <span>{this.setPassword}</span>
                <i className="iconfont icon-gengduo"></i>
              </div>
            </div>
            <div className={styles.itemBox}>
              <div className={styles.accountItemLeft}>
                <span className={styles.leftTit}>实名认证</span>
              </div>
              <div className={styles.accountItemRight}>
                <span>{"未认证"}</span>
                <i className="iconfont icon-gengduo"></i>
              </div>
            </div>
            <div className={styles.itemBox}>
              <div className={styles.accountItemLeft}>
                <span className={styles.leftTit}>登陆设备管理</span>
              </div>
              <div className={styles.accountItemRight}>
                <i className="iconfont icon-gengduo"></i>
              </div>
            </div>
            <div className={styles.itemBox}>
              <div className={styles.accountItemLeft}>
                <span className={styles.leftTit}>申请官方认证</span>
                <p>个人、企业机构的账号认证</p>
              </div>
              <div className={styles.accountItemRight}>
                <i className="iconfont icon-gengduo"></i>
              </div>
            </div>
            <div className={styles.itemBox}>
              <div className={styles.accountItemLeft}>
                <span className={styles.leftTit}>抖某安全中心</span>
                <p>包含账号信息泄漏、诈骗等账号问题</p>
              </div>
              <div className={styles.accountItemRight}>
                <i className="iconfont icon-gengduo"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     list: state.userReducer.list,
//     judgment:state.userReducer.judgment
//   };
// };
// const mapDispatchToProps = (dispatch)=>{
//   return {
    
//     sign: (flag)=>{
//       if(flag==="sign out"){
//         dispatch(showMessage)
//       }
//     },
//     cancel:()=>{
//       dispatch(hideMessage)
//     },
//   }
// }
// const setup = connect(mapStateToProps, mapDispatchToProps)(SetUp);
// export default withRouter(setup)
export default withRouter(AccountSecurity)
