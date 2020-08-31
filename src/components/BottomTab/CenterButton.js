import React, { Component } from "react";
import { Fun1, Fun2 } from "../../store/centerButtonStore/action";
import { connect } from "react-redux";
import "./sass/CenterButton.scss";

class index extends Component {
  render() {
    return <div className="center-button-box">CenterButton</div>;
  }
}
function mapStateToProps(store) {
  return {
    // 示例
    value: store.homeReducer.value,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 示例
    fun1: () => {
      dispatch(Fun1);
    },
    fun2: () => {
      dispatch(Fun2);
    },
  };
}

const CenterButton = connect(mapStateToProps, mapDispatchToProps)(index);
export default CenterButton;
