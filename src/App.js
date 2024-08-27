/** 评论列表
 * 1. 布局，渲染评论列表
 * 2. tab 高亮，根据选中的 tab 进行排序
 * 3. 删除评论
 *
 */

import { useState } from "react";
import _ from "lodash";
import classNames from "classnames";
import "./App.scss";
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
  const [tab, setTab] = useState("hot");
  const [commentList, setCommentList] = useState(INIT_LIST);

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
                <span className={classNames("nav-item", { active: tab === item.type })} key={item.type}>
                  {item.text}
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
            <textarea className="reply-box-textarea" placeholder="发一条友善的评论" />
            {/* 发布按钮 */}
            <div className="reply-box-send">
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
