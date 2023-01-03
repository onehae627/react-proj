import React, { useState, useCallback } from "react";

import "./App.css";

let SubCallCount = 0;
function Sub({ no1, no2, calculateFunc }) {
  SubCallCount++;
  console.log(`SubCallCount: ${SubCallCount}`);

  return (
    <>
      <div style={{ border: "5px solid red", padding: 10 }}>
        입력:{no1}, {no2}
        <br />
        결과: {calculateFunc(no1, no2)}
      </div>
    </>
  );
}

let AppCallCount = 0;
// 렌더링 막음.
const MemorisedSub = React.memo(Sub);

function App() {
  AppCallCount++;
  console.log(`AppCallCount: ${AppCallCount}`);

  const [no1, setNo1] = useState(0);
  const [no2, setNo2] = useState(0);

  const calculateFunc = useCallback((a, b) => a + b, []);

  return (
    <>
      <div>안녕하세요</div>
      <button onClick={() => setNo1(no1 + 1)}>버튼1 : {no1}</button>
      <hr />
      <button onClick={() => setNo2(no2 + 1)}>버튼2 : {no2}</button>
      <hr />
      <MemorisedSub no1={10} no2={20} calculateFunc={calculateFunc} />
    </>
  );
}

export default App;
