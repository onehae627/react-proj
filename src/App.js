import React, { useState, useMemo, useEffect } from "react";

import "./App.css";

let SubCallCount = 0;
function Sub({ no1, no2 }) {
  SubCallCount++;
  console.log(`SubCallCount: ${SubCallCount}`);

  return (
    <>
      <div style={{ border: "5px solid red", padding: 10 }}>
        서브:{no1 + no2}
      </div>
    </>
  );
}

let AppCallCount = 0;

const MemorisedSub = React.memo(Sub);
function App() {
  AppCallCount++;
  console.log(`AppCallCount: ${AppCallCount}`);

  const [no, setNo] = useState(0);
  return (
    <>
      <div>안녕하세요</div>
      <button onClick={() => setNo(no + 1)}>버튼 : {no}</button>
      <hr />
      <MemorisedSub no1={10} no2={no} />
    </>
  );
}

export default App;
