import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteAction, attentionAction} from "../../store/messageStore/action";
import "../../sass/Message.scss";
import Nav01 from "../../assets/images/message/nav1.png";
import Nav02 from "../../assets/images/message/nav2.jpg";
import Nav03 from "../../assets/images/message/nav3.png";
import Nav04 from "../../assets/images/message/nav4.png";
import M01 from "../../assets/images/message/m01.png";
import M02 from "../../assets/images/message/m02.png";
import M03 from "../../assets/images/message/m03.png";
import cancel from "../../assets/images/message/x.png";
import info from "../../assets/images/message/info.png";
import search from '../../assets/images/message/search.png'
import rest from "../../assets/images/message/rest.png";


class index extends Component {
  history = (path) => {
    this.props.history.push(path);
  };
  
  state = {isShow:false}
  
  aChat=()=>{
    // console.log(isShow);
    this.setState({
      isShow:true
    })
  }
  rest=()=>{
    this.setState({
      isShow:false
    })
  }

  render() {
    // const xxx = [{ img: cancel }];
    const navList = [
      { id: 1, img: Nav01, text: "粉丝", path: "/message/fans" },
      { id: 2, img: Nav02, text: "赞", path: "/message/praise" },
      { id: 3, img: Nav03, text: "@我的", path: "/message/mine" },
      { id: 4, img: Nav04, text: "评论", path: "/message/comment" },
    ];
    const Official = [
      {
        id: 22,
        img: M01,
        title: "抖音小助手",
        message: "想见你了",
        times: "2020-2-15",
      },
      {
        id: 33,
        img: M02,
        title: "系统通知",
        message: "抖音安全系统通知",
        times: "2020-2-02",
      },
      {
        id: 44,
        img: M03,
        title: "春节活动助手",
        message: "发财中国年集卡活动",
        times: "2020-1-23",
      },
    ];
     const goodFriend = [
      { id: 1, img: Nav01, name: "黄晓明",},
      { id: 2, img: Nav01, name: "谢霆锋",},
      { id: 3, img: Nav01, name: "张一山",},
      { id: 4, img: Nav01, name: "赵丽颖",},
      { id: 5, img: Nav01, name: "陈伟霆",},
     ]
    return (
      <div className="message">
        <div className="messageTitle">
          <p>消息</p>
          <b onClick={this.aChat}>发起聊天</b>
        </div>

        <div className="container">
          <div className="messageNav">
            <ul>
              {navList.map((navList) => (
                <li key={navList.id}>
                  <img
                    alt=""
                    onClick={this.history.bind(this, navList.path)}
                    src={navList.img}
                  ></img>
                  <p>{navList.text}</p>{" "}
                </li>
              ))}
            </ul>
          </div>
          <div className="messageOfficial">
            <div className="messageOfficialLeft">
              <ul>
                {Official.map((Official) => (
                  <li className="OfficialItem" key={Official.id}>
                    <img src={Official.img} alt=""></img>
                    {/* <p>{Official.title}</p> */}
                    <span>
                      {Official.title}
                      <p>{Official.message}</p>
                    </span>
                    <b> {Official.times}</b>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="messageRecommend">
            <p className="Title">
              推荐关注
              <img alt="" src={info}></img>
            </p>
            <div className="messageRecommendList">
           
              <ul>
                {this.props.list.map((list, index) => (
                  <li className="messageRecommendListItem" key={list.id}>
                    <div>
                      <img alt="" src={list.img}></img>
                    </div>
                    <span>
                      {list.name}
                      <p>{list.text}</p>
                    </span>
                    <div className="focusBtn" onClick={this.props.ChangeIsFollowed.bind(this,list.id)}>
                      {list.isFollowed === false ? (<div className="Focus">关注</div>) : (
                        <div className="notFocus">已关注</div>)}
                    </div>
                    <button
                      onClick={this.props.deleteItem.bind(this, index)}
                      key={list.id}
                    >
                      <img alt="" src={cancel}></img>
                    </button>
                  </li>
                ))}
                <p>暂时没有更多了</p>
              </ul>
            </div>
          </div>
          {/* 发起聊天 */}
        <div className={`aChat ${this.state.isShow?"active":""}`}>
          <div className='aChatTitle'><button className={`restMeassage ${this.state.isShow?"actveNull":""}`} onClick={this.rest}><img alt='' src={cancel}></img></button> <p>选择互关好友</p><div onClick={this.rest}>完成</div></div>
          <div className='search'><img src={search} alt=''></img><input placeholder='搜索'></input></div>
          <div className='group'><span>已加入的群聊</span><button><img alt='' src={rest}></img></button></div>
          <ul>
            {goodFriend.map((goodFriend)=>
            <li className='goodFriendItem' key={goodFriend.id}>
              <div className='mycheck'><input type="checkbox" id='checkbox'></input><label htmlFor='checkbox'></label></div>
            <div><img src={goodFriend.img} alt=""></img><p>{goodFriend.name}</p></div>
            </li>)}
          </ul>
        </div>
        {/* 发起聊天 end */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  // console.log(store);
  return {
    // 从总仓库 store文件 拿到的组件最新状态
    list: store.messageReducer.list,
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // 2.绑定的事件派发出去,那么需要引入action
    deleteItem(index) {
      //4.什么事件,就把对应的action派发出去
      dispatch(deleteAction(index));
    },
    ChangeIsFollowed(id) {
      dispatch(attentionAction(id));
    },
    
  };
};

const Message = connect(mapStateToProps, mapDispatchToProps)(index);

export default withRouter(Message);
// export default message]
