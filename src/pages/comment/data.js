import avatar from "./images/girl.jpg";

// 导航 Tabs
export const tabList = [
  { label: "最热", value: "hot" },
  { label: "最新", value: "time" },
];

// 当前登录用户信息
export const userInfo = {
  uid: "30009257", // 用户id
  avatar, // 用户头像
  uname: "语佳", // 用户昵称
};

// 评论列表数据
export const commentList = [
  {
    id: 3, // 评论id
    user: {
      // 用户信息
      uid: "13258165",
      avatar: "",
      uname: "周杰伦",
    },
    content: "哎哟，不错哦", // 评论内容
    ctime: "10-18 08:02", // 评论时间
    like: 88,
  },
  {
    id: 2,
    user: {
      uid: "36080105",
      avatar: "",
      uname: "许嵩",
    },
    content: "水中寒月",
    ctime: "11-13 11:29",
    like: 88,
  },
  {
    id: 1,
    user: {
      uid: "30009257",
      avatar,
      uname: "语佳",
    },
    content: "你就是我的小星星",
    ctime: "10-19 09:00",
    like: 66,
  },
];
