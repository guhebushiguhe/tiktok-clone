import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Tab from "./components/BottomTab"
import Home from "./components/Home";
import SameCity from "./components/SameCity";
import Message from "./components/Message";
import User from "./components/User";
import SetUp from "./components/User/moreComponents/setup/SetUp"
import AccountSecurity from "./components/User/moreComponents/setup/accountSecurity/AccountSecurity"
import SetPassword from './components/User/moreComponents/setup/setPassword/SetPassword'
import CodePassword from './components/User/moreComponents/setup/setPassword/CodePassword'
import Logon from './components/User/moreComponents/login/Login'
import SMSLogon from './components/User/moreComponents/login/SMSLogin'
import PasswordLogin from './components/User/moreComponents/login/PasswordLogin'
import CodeLogin from './components/User/moreComponents/login/CodeLogin'
import Page404 from "./components/Page404";
import Videoe from "./components/SameCity/moreComponents/videoe/Videoe"
import Fans from "./components/Message/moreComponents/Fans"
import Praise from "./components/Message/moreComponents/Praise"
import Mine from "./components/Message/moreComponents/Mine"
import Comment from "./components/Message/moreComponents/Comment"
import CheckStatus from "./components/User/moreComponents/checkStatus"

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={()=><Tab><Home></Home></Tab>}></Route>


          <Route path="/samecity" exact render={()=><Tab><SameCity></SameCity></Tab>}></Route>


          <Route path="/message" exact render={()=><Tab><Message></Message></Tab>}></Route>
          <Route path="/message/fans" exact render={()=><Tab><Fans></Fans></Tab>}></Route>
          <Route path="/message/praise" exact render={()=><Tab><Praise></Praise></Tab>}></Route>
          <Route path="/message/mine" exact render={()=><Tab><Mine></Mine></Tab>}></Route>
          <Route path="/message/comment" exact render={()=><Tab><Comment></Comment></Tab>}></Route>


          <Route path="/user" exact render={()=><Tab><User></User></Tab>}></Route>
          <Route path="/checkstatus" exact render={()=><Tab><CheckStatus></CheckStatus></Tab>}></Route>
          <Route path="/user/setup" exact render={()=><SetUp></SetUp>}></Route>
          <Route path="/user/accountSecurity" exact render={()=><AccountSecurity></AccountSecurity>}></Route>
          <Route path="/user/setPassword" exact render={()=><SetPassword></SetPassword>}></Route>
          <Route path="/user/codePassword" exact render={()=><CodePassword></CodePassword>}></Route>
          <Route path="/user/login" exact render={()=><Logon></Logon>}></Route>
          <Route path="/user/smslogin" exact render={()=><SMSLogon></SMSLogon>}></Route>
          <Route path="/user/codelogin" exact render={()=><CodeLogin></CodeLogin>}></Route>
          <Route path="/user/passwordlogin" exact render={()=><PasswordLogin></PasswordLogin>}></Route>


          {/* 动态路由 */}
          <Route path="/video/:id" exact render={()=><Videoe></Videoe>}></Route>
          <Route path="/" render={()=><Tab><Page404></Page404></Tab>}></Route>
        </Switch>
      </Router>
    );
  }
}
