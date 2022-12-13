import React, { useState } from "react";

function StopWatch() {
  const [num, setNum] = useState(0);
  
  const timeoutID = setTimeout(() => setNum(num + 1), 1000);
  
  const pause = () => clearTimeout(timeoutID);

  const resume = () => {
    setTimeout(() => setNum(num + 1), 1000);
  };

  
  return (
    <>
      숫자 : {num}
      <hr />
      <button onclick={pause}>일시정지</button>
      
    </>
  );
  
}

export default StopWatch;

