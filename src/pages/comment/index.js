/** 评论列表
 * 1. 布局，渲染评论列表
 * 2. tab 高亮，根据选中的 tab 进行排序
 * 3. 发布评论
 * 4. 删除评论
 */

import { useState, useRef } from "react";
// utils
import classNames from "classnames";
import _ from "lodash";
import { v4 as uuidV4 } from "uuid";
import dayjs from "dayjs";
// 本业务
import "./index.scss";
import { tabList, userInfo, commentList as INIT_LIST } from "./data";
import avatar from "./images/girl.jpg";

function CommentItem({ item, onDel }) {
  return (
    <div className="reply-item">
      {/* 头像 */}
      <div className="root-reply-avatar">
        <div className="bili-avatar">
          <img className="bili-avatar-img" alt="" src={item.user.avatar} />
        </div>
      </div>

      <div className="content-wrap">
        {/* 用户名 */}
        <div className="user-info">
          <div className="user-name">{item.user.uname}</div>
        </div>
        {/* 评论内容 */}
        <div className="root-reply">
          <span className="reply-content">{item.content}</span>
          <div className="reply-info">
            {/* 评论时间 */}
            <span className="reply-time">{item.ctime}</span>
            {/* 评论数量 */}
            <span className="reply-time">点赞数:{item.like}</span>
            <span className="delete-btn" onClick={() => onDel(item.id)}>
              删除
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const App = () => {
  // 当前选中的 tab 值
  const [curTab, setCurTab] = useState("hot");

  // 切换 tab
  function clickTab(tab) {
    if (tab === curTab) {
      return;
    }

    setCurTab(tab);

    if (tab === "hot") {
      // 按点赞数量逆序
      setCommentList(_.orderBy(commentList, "like", "desc"));
    } else if (tab === "time") {
      // 按评论时间逆序
      setCommentList(_.orderBy(commentList, "ctime", "desc"));
    }
  }

  // 发布评论输入框内容
  const [content, setContent] = useState("");

  // 发布评论输入框 ref
  const inputRef = useRef(null);

  // 发布评论
  function clickPublish() {
    console.log("点击发布");
    if (content.trim() === "") {
      console.log("空");
      alert("请输入评论内容");
      return;
    }

    setCommentList([
      ...commentList,
      {
        id: uuidV4(), // 随机id,
        user: { ...userInfo },
        content: content,
        ctime: dayjs(new Date()).format("MM-DD hh:mm"),
        like: 0,
      },
    ]);

    // 清空输入框内容
    setContent("");

    // 重新聚焦输入框
    inputRef.current.focus();
  }

  // 评论列表
  const [commentList, setCommentList] = useState(INIT_LIST);

  // 删除一条评论
  function delItem(id) {
    setCommentList(commentList.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{10}</span>
          </li>
          {/* 导航 Tab */}
          <li className="nav-sort">
            {tabList.map((item) => {
              return (
                <span
                  className={classNames("nav-item", { active: curTab === item.value })}
                  key={item.value}
                  onClick={() => clickTab(item.value)}
                >
                  {item.label}
                </span>
              );
            })}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
              ref={inputRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {/* 发布按钮 */}
            <div className="reply-box-send" onClick={clickPublish}>
              <div className="send-text">发布</div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
          {/* 评论项 */}
          {commentList.map((item) => {
            return <CommentItem key={item.id} item={item} onDel={delItem} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
