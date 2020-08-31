import React, { Component } from "react";
import rest from "../../../assets/images/message/rest.png";
import Name01 from "../../../assets/images/message/name01.jpg";
import Name02 from "../../../assets/images/message/name02.jpg";
import Name03 from "../../../assets/images/message/name03.jpg";
import Name04 from "../../../assets/images/message/name04.jpg";
import Name05 from "../../../assets/images/message/name05.jpg";
import Photo01 from "../../../assets/images/message/photo01.jpg";
import Photo02 from "../../../assets/images/message/photo02.jpg";
import Photo03 from "../../../assets/images/message/photo03.jpg";
import Photo04 from "../../../assets/images/message/photo04.jpg";
import Photo05 from "../../../assets/images/message/photo05.jpg";
import "./Mine.scss";
class Mine extends Component {
  histroy = () => {
    window.history.back(-1);
  };

  render() {
    const path = [{ path: "/moreComponents/Mine" }];
    const MineList = [
      {
        id: 111,
        img: Name01,
        name: "黄晓明",
        comment: "有时候得到是另外一种失去得与舍总是结伴一起 ❤️",
        time: "在评论中提到你 2020 - 08 - 12",
        poto: Photo01,
      },
      {
        id: 222,
        img: Name02,
        name: "谢霆锋",
        comment: "我爱你。很爱很喜欢。我爱你。我爱你😝",
        time: "在评论中提到你 2020 - 08 - 24",
        poto: Photo02,
      },
      {
        id: 333,
        img: Name03,
        name: "张一山",
        comment: "我特别想问这个歌名是什么意思，有人给我科普一下吗？😈！",
        time: "在评论中提到你 2020 - 03 - 21",
        poto: Photo03,
      },
      {
        id: 444,
        img: Name04,
        name: "赵丽颖",
        comment: "我tm直接爱☺️",
        time: "在评论中提到你 2020 - 01 - 24",
        poto: Photo04,
      },
      {
        id: 555,
        img: Name05,
        name: "陈伟霆",
        comment: "开口跪，太喜欢艾福杰尼了🚧",
        time: "在评论中提到你 2020 - 03 - 18",
        poto: Photo05,
      },
    ];
    return (
      <div className="MineContainer">
        <div className="MineListTitle">
          <button onClick={this.histroy.bind(this, path.path)}>
            <img alt='' src={rest}></img>
          </button>{" "}
          <span>@我的</span>
        </div>
        <div className="MineList">
          <ul>
            {MineList.map((MineList) => (
              <li className="MineListItem" key={MineList.id}>
                <div>
                  <img alt=''  src={MineList.img}></img>
                </div>
                <span>
                  {MineList.name}
                  <p>{MineList.comment}</p>
                  <p className="times">{MineList.time}</p>
                </span>
             <div className="Focus"><img alt=''  className='product' src={MineList.poto}></img></div>
                {/*1.绑定事件 */}
              </li>
            ))}
            <p className="bottom">暂时没有更多了</p>
          </ul>
        </div>
      </div>
    );
  }
}

export default Mine;
