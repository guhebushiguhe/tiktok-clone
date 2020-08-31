import React, { Component } from "react";
import styles from "./setUp.module.scss";
import {showMessage,hideMessage} from '../../../../store/userStore/action'
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom'

class SetUp extends Component {
  backtrack=()=>{
    this.props.history.push('/user')
  }
  signOut=()=>{
    let data=new Date();
    data.setTime(data.getTime() -8*60*60*1000- 1000)
    document.cookie="phone=v;expires="+data;
    this.props.history.push('/user/login')
    this.props.cancel()
  }
  judge=(flag)=>{
    if(flag==="accountSecurity"){
      console.log(1)
      this.props.history.push("/user/accountSecurity")
    }
    if(flag==="sign out"){
      this.props.sign(flag)
    }
  }
  render() {
    return (
      <div>
        <div className={styles.setUp}>
          {/* 设置的头部 */}
          <div className={styles.setUpHeader}>
            <div className={styles.iconBox} onClick={()=>this.backtrack()}>
              <i className={"iconfont icon-zuojiantou " + styles.iconcolor}></i>
            </div>
            <h2 className={styles.title}>设置</h2>
          </div>
          {/* 设置的item */}
          <div className={styles.con}>
            <div className={styles.setUpBox}>
              {this.props.list.map((v) => (
                <div key={v.title} className={styles.setUpItem}>
                  <h4 className={styles.setUpItemTit}>{v.title}</h4>
                  {v.titleItem.map((v) => (
                    <div key={v.tit} className={styles.itemBox} onClick={()=>{
                        this.judge(v.flag)
                      }}>
                      <div className={styles.setUpItemLeft}>
                        <i className={v.iconfont}></i>
                        <span className={styles.leftTit}>{v.tit}</span>
                      </div>
                      <div className={styles.setUpItemRight}>
                        <i className={v.rightIcon}></i>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* 版本号 */}
            <div className={styles.edition}><span>抖某 version12.4.0</span></div>
          </div>
        </div>
        {/* 退出登录提示 */}
        <div className={[styles.message,this.props.judgment?styles.block:styles.none].join(" ")}>
          <div className={styles.messageBox}>
            <div className={styles.messageTips}>退出？</div>
            <div className={styles.messageName}>@小水先生</div>
            <div className={styles.messageBottom}>
              <span className={styles.cancel} onClick={()=>this.props.cancel()}>取消</span>
              <span className={styles.signOut} onClick={()=>this.signOut()}>退出</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    list: state.userReducer.list,
    judgment:state.userReducer.judgment
  };
};
const mapDispatchToProps = (dispatch)=>{
  return {
    sign: (flag)=>{
      dispatch(showMessage)
    },
    cancel:()=>{
      dispatch(hideMessage)
    },
  }
}
const setup = connect(mapStateToProps, mapDispatchToProps)(SetUp);
export default withRouter(setup)
