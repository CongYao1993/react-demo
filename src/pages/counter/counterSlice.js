// src/pages/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  // Slice 名称，独一无二
  name: "counter",
  // 初始数据
  initialState: {
    count: 0,
  },
  // 修改数据的同步方法
  reducers: {
    increment: (state) => {
      // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑
      // 并不是真正的改变 state 因为它使用了 immer 库
      // 当 immer 检测到 "draft state" 改变时，会基于这些改变去创建一个新的不可变的 state
      state.count++;
    },
    decrement: (state) => {
      state.count--;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});

// 下面这个函数就是一个 thunk ，它使我们可以执行异步逻辑
// 调用 thunk 时接受 `dispatch` 函数作为第一个参数
// 当异步代码执行完毕时，可以 dispatched actions
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// 自动生成与编写的 reducer 函数同名的 action creator `counterSlice.actions.increment()`，调用该函数生成 action 类型字符串
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;

// reducer 函数可以处理 action
export default counterSlice.reducer;
