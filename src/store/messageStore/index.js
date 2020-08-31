// reducer 文件

//8引入常量
import { DELETE ,ATTENTION} from "./actionTypes";
import Name01 from "../../assets/images/message/name01.jpg";
import Name02 from "../../assets/images/message/name02.jpg";
import Name03 from "../../assets/images/message/name03.jpg";
import Name04 from "../../assets/images/message/name04.jpg";
import Name05 from "../../assets/images/message/name05.jpg";
const messageRecommendList = {
  list: [
    {
      id: 111,
      img: Name01,
      name: "黄晓明",
      text: "来自新浪微博",
      isFollowed: true,
    },
    {
      id: 222,
      img: Name02,
      name: "谢霆锋",
      text: "来自网易",
      isFollowed: false,
    },
    {
      id: 333,
      img: Name03,
      name: "张一山",
      text: "来自Twitter",
      isFollowed: false,
    },
    {
      id: 444,
      img: Name04,
      name: "赵丽颖",
      text: "来自Facebook",
      isFollowed: false,
    },
    {
      id: 555,
      img: Name05,
      name: "陈伟霆",
      text: "来自今日头条",
      isFollowed: true,
    },
  ],
};
const FansList = [
  {
    id: 111,
    img: Name01,
    name: "黄晓明",
    text: "关注你了",
    time: '2020 - 08 - 12',
    isFollowed: true,
  },
  {
    id: 222,
    img: Name02,
    name: "谢霆锋",
    text: "关注你了",
    time: '2020 - 08 - 25',
    isFollowed: false,
  },
  {
    id: 333,
    img: Name03,
    name: "张一山",
    text: "关注你了",
    time: '2020 - 08 - 23',
    isFollowed: false,
  },
  {
    id: 444,
    img: Name04,
    name: "赵丽颖",
    text: "关注你了",
    time: '2020 - 08 - 11',
    isFollowed: false,
  },
  {
    id: 555,
    img: Name05,
    name: "陈伟霆",
    text: "关注你了",
    time: '2020 - 08 - 16',
    isFollowed: false,
  },
];

export default function (state = messageRecommendList, action) {
  //5,深拷贝
  let newState = JSON.parse(JSON.stringify(state));
  //6根据传入的action的type字段,判断
  switch (action.type) {
    //7.引入常量
    case DELETE:
      //9.删除
      newState.list.splice(action.payload, 1);
      break;
    case ATTENTION:
      newState.list.forEach((item)=>item.id===action.id?(Object.assign(item,{isFollowed:!item.isFollowed})):item)
      break
  
      default:
        break;
  }
  return newState;
}

