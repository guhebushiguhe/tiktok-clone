import React, { Component } from 'react';
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
import './Praise.scss'
class praise extends Component {
    histroy = () => {
        window.history.back(-1);
      };
    
      render() {
        const path = [{ path: "/moreComponents/Praise" }];
        const praiseList =[
            {
                id: 111,
                img: Name01,
                name: "黄晓明",
                text: "点赞了你的作品",
                time: '2020 - 08 - 12',
                poto: Photo01
              },
              {
                id: 222,
                img: Name02,
                name: "谢霆锋",
                text: "点赞了你的作品",
                time: '2020 - 08 - 25',
                poto: Photo02
              },
              {
                id: 333,
                img: Name03,
                name: "张一山",
                text: "点赞了你的作品",
                time: '2020 - 08 - 23',
                poto: Photo03
              },
              {
                id: 444,
                img: Name04,
                name: "赵丽颖",
                text: "点赞了你的作品",
                time: '2020 - 08 - 11',
                poto: Photo04
              },
              {
                id: 555,
                img: Name05,
                name: "陈伟霆",
                text: "点赞了你的作品",
                time: '2020 - 08 - 16',
                poto: Photo05
              },
        ]
        return (
          <div className="praiseContainer">
            <div className="praiseListTitle">
              <button onClick={this.histroy.bind(this, path.path)}>
                <img alt='' src={rest}></img>
              </button>
              <span>赞</span>
            </div>
            <div className="praiseList">
            <ul>
            {praiseList.map((praiseList) => (
              <li className="praiseListItem" key={praiseList.id}>
                <div>
                  <img alt=''  src={praiseList.img}></img>
                </div>
                <span>
                  {praiseList.name}
                  <p>{praiseList.text}</p>

                <p className="times">
                    {praiseList.time}
                </p>
                </span>
                <div className="Focus"><img alt=''  className='product' src={praiseList.poto}></img></div>
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

 
export default praise;