import React, { Component } from "react";
import "./Fans.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import rest from "../../../assets/images/message/rest.png";
import {FocusAction} from '../../../store/messageStore/action'

class Fans extends Component {
  histroy = () => {
    window.history.back(-1);
  };
shouldComponentUpdate(){
  console.log(this.props.list[0].isFollowed);
}
  render() {
    
    const path = [{ path: "/moreComponents/Fans" }];
    return (
      <div className="FansList">
        <div className="FansListTitle">
          <button onClick={this.histroy.bind(this, path.path)}>
            <img alt='' src={rest}></img>
          </button>{" "}
          <span>粉丝</span>
        </div>
        {/* 粉丝聊表 */}
        <div className="FansListed">
          {/* {list} */}
          <ul>
            {this.props.list.map((list) => (
              <li className="FansListedItem" key={list.id}>
                <div>
                  <img alt='' src={list.img}></img>
                </div>
                <span>
                  {list.name}
                  <p>{list.text}</p>
                <p className ="times">
                    {list.time}
                </p>
                </span>
                <div onClick={this.props.ChangeIsFollowed.bind(this,list.id)}>
                      {list.isFollowed === false ? (<div className="Focus">回关</div>) : (
                        <div className="notFocus">互相关注</div>)}
                    </div>
              </li>
            ))}
            <p className="bottom">暂时没有更多了</p>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  console.log(store.messageReducer.FansList);
  
  return {
    list: store.messageReducer.FansList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ChangeIsFollowed(id) {
      dispatch(FocusAction(id));
    },
  };
};
const Message = connect(mapStateToProps, mapDispatchToProps)(Fans);

export default withRouter(Message);