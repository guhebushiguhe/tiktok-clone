import React, { Component } from "react";
import rest from "../../../assets/images/message/rest.png";
import "./Comment.scss";
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
class Comment extends Component {
  histroy = () => {
    window.history.back(-1);
  };

  render() {
    const path = [{ path: "//moreComponents/Comment" }];
    const CommentList = [
      {
        id: 111,
        img: Name01,
        name: "黄晓明",
        comment:
          "思绪回到17年的夏天五亿探长 最爱的唱片第一次 看你的巡演举起手机 拍下照片 我想 我想有一天和你同台表演 舞台效果炸裂",
        time: "在评论了你的作品  2020 - 08 - 12",
        poto: Photo01,
      },
      {
        id: 222,
        img: Name02,
        name: "谢霆锋",
        comment:
          "在前行的路上难免会迷失方向，无论混的潦倒还是出众，都不要忘记回家的路，也不必在意流言蜚语，勇敢前进就好",
          time: "在评论了你的作品  2020 - 08 - 25",
        poto: Photo02,
      },
      {
        id: 333,
        img: Name03,
        name: "张一山",
        comment:
          "我安安静静回看过去种种 我的初衷一步步熬成了奢望 哈 命运捉弄人 既来之则安之 大学我来啦 我可以靠自己力量混出来的 陈小艺！加油！！！",
          time: "在评论了你的作品  2020 - 03 - 30",
        poto: Photo03,
      },
      {
        id: 444,
        img: Name04,
        name: "赵丽颖",
        comment: "好喜欢这首歌😍😍",
        time: "在评论了你的作品  2020 - 05 - 19",
        poto: Photo04,
      },
      {
        id: 555,
        img: Name05,
        name: "陈伟霆",
        comment: "单曲循环中……hook洗脑👍👍嘉申哥好66666",
        time: "在评论了你的作品  2020 - 06 - 22",
        poto: Photo05,
      },
    ];

    return (
      <div className="CommentListContainer">
        <div className="CommentListTitle">
          <button onClick={this.histroy.bind(this, path.path)}>
            <img alt='' src={rest}></img>
          </button>{" "}
          <span>评论</span>
        </div>
        <div className="CommentList">
          <ul>
            {CommentList.map((CommentList) => (
              <li className="CommentListItem" key={CommentList.id}>
                <div>
                  <img alt=''  src={CommentList.img}></img>
                </div>
                <span>
                  {CommentList.name}
                  <p>{CommentList.comment}</p>
                  <i className="times">{CommentList.time}</i>
                </span>
               
                <img alt='' src={CommentList.poto} className='poto'></img>
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

export default Comment;
