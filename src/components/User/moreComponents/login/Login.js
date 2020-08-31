import React, { Component } from 'react'
import styles from './Login.module.scss'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {changeShow} from '../../../../store/userStore/action'
import toutiao from '../../../../assets/images/users/toutiao.png'
import qq from '../../../../assets/images/users/qq.png'
import wx from '../../../../assets/images/users/wx.png'
import wb from '../../../../assets/images/users/wb.png'

class Login extends Component {
  constructor(props){
    super(props)
    this.localPhone=localStorage.getItem("phone")
    this.handlePhone=this.localPhone.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')

  }
  otherPhoneSignIn=()=>{
    this.props.history.push('/user/smslogin')
  }
  signIn=()=>{
    document.cookie="phone="+this.localPhone;
    this.props.history.push('/')
  }
  close=()=>{
    this.props.history.push("/")
  }
  componentDidMount(){
    this.props.changeShow(true)
  }
  render() {
    return (
      <div className={styles.loginBox}>
        <div className={styles.login}>
          {/* 头部 */}
          <div className={styles.header} onClick={this.close}>
            <i className={"iconfont icon-cuo "+styles.close}></i>
            <span>帮助</span>
          </div>
          {/* 中间信息 */}
          <div className={styles.avatar}>
            <h5>登录后即可展示自己</h5>
            <span className={styles.phone}>{this.handlePhone}</span>
            <span className={styles.authentication}>认证服务由中国移动提供</span>
          </div>
          {/* 本机号码一键登录 */}
          <div className={styles.SignIn}>
            <div className={styles.btn} onClick={() => {
              this.signIn()
            }
            }>本机号码一键登录</div>
            <div className={styles.btn1} onClick={this.otherPhoneSignIn}>其他手机号码登录</div>
            <p>
              登录即表明同意
              <span>用户协议</span>
              和
              <span>隐私政策</span>
            </p>
            <p>
              以及
              <span>《中国移动认证服务条款》</span>
            </p>
          </div>
          {/* 底部 */}
          <div className={styles.bottom}>
            <span onClick={() => {
              this.props.changeShow(false)
            }
            } className={this.props.isShow?styles.Show:styles.hidden}>其他方式登录</span>
            <div className={(this.props.isHidden?styles.Show:styles.hidden)+" "+styles.imgBigBox}>
              <img className={styles.thirdParty} src={toutiao} alt=""></img>
              <img className={styles.thirdParty} src={qq} alt=""></img>
              <img className={styles.thirdParty} src={wx} alt=""></img>
              <img className={styles.thirdParty} src={wb} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    isShow:state.userReducer.Show,
    isHidden:state.userReducer.isHidden
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeShow:(i)=>{
      dispatch(changeShow(i))
    }
  }
}

const phonelogin = connect(mapStateToProps,mapDispatchToProps)(Login)
export default withRouter(phonelogin)
