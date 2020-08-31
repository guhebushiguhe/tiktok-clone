
import React, { Component } from "react";
// import { Fun1, Fun2 } from "../../../../store/messageStore/action";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom"
// import "../../sass/Message.scss";

class index extends Component {
   state={
     videoPost:[
       {
         id:1,

       }
     ]
   }
     
  componentDidMount(){
    console.log(this.props)
  }
  render() {
    return(
      <div>
        
       </div>
    );
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
    // fun1: () => {
    //   dispatch(Fun1);
    // },
    // fun2: () => {
    //   dispatch(Fun2);
    // },
  };
}

const Videoe = connect(mapStateToProps, mapDispatchToProps)(index);

export default withRouter(Videoe);


