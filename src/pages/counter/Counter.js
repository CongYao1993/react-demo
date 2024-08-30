// src/pages/counter/Counter.js

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount, incrementAsync, selectCount } from "./counterSlice";

export default function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [addValue, setAddValue] = useState(["1"]);

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementAsync(10))}>异步+10</button>
      <input value={addValue} onChange={(e) => setAddValue(e.target.value)} />
      <button onClick={() => dispatch(incrementByAmount(parseInt(addValue)))}>+输入的值</button>
    </div>
  );
}
