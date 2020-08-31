import React, { Component } from "react";
import { Fun1, Fun2 } from "../../store/sameCityStore/action";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../../sass/SameCity.scss";
import cityJson from "./moreComponents/index.json";
import Home from "../Home"
import axios from "axios"
// import _, { indexOf } from "lodash";

class index extends Component {
 //锚点
  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        anchorElement.scrollIntoView();
      }
    }
  };
 
  state = {
    videoList: [],
    city: [
      "深圳",
      "北京",
      "上海",
      "成都",
      "广州",
      "重庆",
      "西安",
      "贵州",
      "武汉",
      "杭州",
      "郑州",
      "南京",
      "合肥",
      "长沙",
      "福州",
    ],
    location: false,
    qieHuaN: "",
    inputVal: "",
    casSem:false,
    Arr: [],
    navIsShow:true,
    showVideoIndex: 999, // 点击封面后开始播放的视频索引(-1是为了点击0的时候能刷新)
    isShowVideoPlayer: false, // 是否弹出视频播放界面
  };
  // goTo = (e) => {
  //   this.props.history.push("/video/" + e);
  // };
  handleClick = () => {
    this.setState({
      locationGoto: true,
    });
    // console.log(cityJson);
  };
  goIn = () => {
    this.setState({
      locationGoto: false,
    });
  };

  reMenClick = (item) => {
    // console.log(index)
    this.setState({
      qieHuaN: item,
      locationGoto: false,
    });
    axios.post("/sameCity/videoListSameCity",{
      city:item
    }
    ).then(res=>{
      console.log(res)
      let newVideoList = res.data.map(item=>Object.assign(item,{
        photoUrl: item.photoUrl.replace("http://42.194.186.54/tiktok-assets","assets"),
        videoCover: item.videoCover.replace("http://42.194.186.54/tiktok-assets","assets"),
        videoSrc: item.videoSrc.replace("http://42.194.186.54/tiktok-assets","assets")
      }))
      this.setState({
        videoList:newVideoList
      })
    }).catch(err=>{
      console.log(err)
    })
  };
  CityClick = (i) => {
    this.setState({
      qieHuaN: i,
      locationGoto: false,
    });
  };
  addClick = (e) => {
    this.setState({
      inputVal: e.target.value,
    });
    if(this.state.inputVal===""){
      this.setState({
        casSem:false
      })
    }else{
      this.setState({
        casSem:true
      })
    }

  };
  setValue=(e)=>{
    if(e.target.value){
      let city=[];
      for (let item of cityJson){
        for(let item1 of item.citys){
          city.push(item1)
        }
      }
      let list=[]
      for (let item of city){
        console.log(item.indexOf(e.target.value))
        let c=item.indexOf(e.target.value)!==-1
        if(c){
          list.push(item);
        }
      }
      console.log(list)
      this.setState({
        Arr:list
        
    })
    }
    this.state.Arr = []
    // this.setState({
    //   Arr: ""
    // })
  }
  sameAdd=(item)=>{
    this.setState({
      qieHuaN: item,
      locationGoto: false,
       Arr:"",
      inputVal:""
    })
   
   
  }
  
  BlurClick=()=>{
    setTimeout(()=>{
      this.setState({
        casSem:false,
        Arr:"",
        inputVal:""

      })
    })
    // console.log(111)
  }

 
 
   componentDidMount(){
     window.addEventListener('touchstart',handleTouchStart)
     window.addEventListener('touchmove',handleTouchMove)
     let startY =0
     let endY = 0
     let that =this
      function handleTouchStart  (e)  {
     startY =e.touches[0].clientY;
     
    };
   function handleTouchMove(e) {
      endY = e.touches[0].clientY;
      // console.log("开始"+startY)
      // console.log("结束"+endY)
    
     
      // endY - startY
    //  console.log(this.inputRef)
      if(startY>endY){
       that.setState({
         navIsShow:false
       })
      }
      if(startY<endY){
        that.setState({
          navIsShow:true
        })
      }
      }


      
      axios.post("/sameCity/videoListSameCity",{
        city:"深圳"
      }
      ).then(res=>{
        console.log(res)
        let newVideoList = res.data.map(item=>Object.assign(item,{
          photoUrl: item.photoUrl.replace("http://42.194.186.54/tiktok-assets","assets"),
          videoCover: item.videoCover.replace("http://42.194.186.54/tiktok-assets","assets"),
          videoSrc: item.videoSrc.replace("http://42.194.186.54/tiktok-assets","assets")
        }))
        this.setState({
          videoList:newVideoList
        })
      }).catch(err=>{
        console.log(err)
      })
   }

   componentWillUnmount() {
    this.setState = ()=>false;
  }

   // 跳转视频播放
   showVideo=(index)=>{
    this.setState({
      showVideoIndex: index,
      isShowVideoPlayer: true
    })
   }
   // 关闭视频播放
   closeVideo=()=>{
     document.querySelectorAll('video').forEach(item=>{
       item.pause()
       item.currentTime=0
      })
    this.setState({
      isShowVideoPlayer: false
    })
   }
  render() {
    return (
      <div className="parents" >
          <div className={`CityVideoPlayer ${this.state.isShowVideoPlayer?"show":""}`}>
            <p className="qieHuAnHeaderTitle1 iconfont icon-icon_close" onClick={this.closeVideo}> </p>
            <Home
            sameCityVideoList={this.state.videoList}
            videoIndex={this.state.showVideoIndex}
            ></Home>
          </div>
        <div className="sameCityBox">
        <div >
          <div className={`headerCity ${this.state.navIsShow ? "" : "hideNav"}`} id="header1">
            <h3 onClick={this.handleClick}>{this.state.qieHuaN ? this.state.qieHuaN : "深圳"}</h3>
          </div>
          {/* //头部的结束 */}
          {/* //内容的开始 */}
          <div className="content">
            <div className="contentMap">
              <div className="contentMapLeft">
                <span className="iconfont icon-weizhi">自动定位：深圳</span>
              </div>
              <div className="contentMapRight" onClick={this.handleClick}>
                <span>切换</span>
                <span className="iconfont icon-gengduo"></span>
              </div>
            </div>
            {/* 视频区域开始*/}
            <div className="contentVideo">
              {this.state.videoList.map((item,index) => {
                return (
                  <div
                    className="boxLeft"
                    key={index}
                    // onClick={this.goTo.bind(this, item.id)}
                  >
                    <div className="box1" onClick={()=>{this.showVideo(index)}}>
                      <img
                        src={ require(`../../${item.videoCover}`)}
                        className="videoPlay"
                        alt=""
                      />
                      <span className="someCityTitle">{item.distance}</span>
                      <img
                        src={ require(`../../${item.photoUrl}`)}
                        className="headerImg"
                        alt=""
                      />
                    </div>
                  </div>
                  
                );
              })}
            </div>

            {/* 视频区域结束 */}
          </div>
          {/* //内容的结束 */}
          {/* //头部的开始 */}
        </div>
        {/* 切换地图开始 */}
        <div className={`QieHuan ${this.state.locationGoto ? "active" : ""}`}>
          <div className="qieHuAnHeader">
            <p className="qieHuAnHeaderTitle1 iconfont icon-icon_close" onClick={this.goIn}>
            
            </p>
            <p className="qieHuAnHeaderTitle2">切换城市</p>
          </div>
          {/* 输入框搜索开始 */}
          <div >
          <input
            value={this.state.inputVal}
            onChange={this.addClick}
            className="input"
            placeholder="请输入你要搜索的城市"
            onInput={this.setValue}
            // onFocus={this.focusClick}
            onBlur={this.BlurClick}
          />
          <div className={`Sousuo ${this.state.casSem ? "visition":""}`}>
          {
            // if(this.state.Arr.length<=0){
            //   return("")
            // }
            this.state.Arr.length<=0 ? "" :
            this.state.Arr.map((item,index)=>{
              return(
              <li key={index}  onClick={this.sameAdd.bind(this,item)}>{item}</li>
              )
            })
          }
          </div>
          </div>
          {/* 输入框搜索结束 */}
          <div className="qieHuAnMap">
            <span className="iconfont icon-weizhi">自动定位</span>
            <p>{this.state.qieHuaN ? this.state.qieHuaN : "深圳"}</p>
          </div>
          <div className="qieHuAnCity">
            <div className="qieHuAnCityRemen">
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-remen"></use>
              </svg>
              <p>热门城市</p>
            </div>
            <div className="qieHuAnCitys">
              {this.state.city.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="qieHuAnCityTitle"
                    onClick={this.reMenClick.bind(this, item)}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            {/* 城市列表开始 */}
            <div className="startList">
              {cityJson.map((item, index) => {
                return (
                  <li key={index} className="citysName" id={item.name}>
                    {item.name}
                    <ul>
                      {item.citys.map((i, v) => {
                        return (
                          <li
                            key={v}
                            className="citysCity"
                            onClick={this.CityClick.bind(this, i)}
                          >
                            {i}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
              <div
                className={`cityList ${
                  this.state.locationGoto ? "activeTop" : ""
                }`}
              >
                {cityJson.map((a, b) => {
                  return (
                    <i
                      key={b}
                      className="cityListTitle"
                      onClick={() => this.scrollToAnchor(a.name)}
                    >
                      {a.name}
                    </i>
                  );
                })}
              </div>
            </div>
            {/* 城市列表结束 */}
          </div>
        </div>
        {/* 地图切换结束 */}
      </div>
      </div>
    );
  }
}
function mapStateToProps(store) {
  return {
    // 示例
    value: store.sameCityReducer.value,
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

const SameCity = connect(mapStateToProps, mapDispatchToProps)(index);

export default withRouter(SameCity);
