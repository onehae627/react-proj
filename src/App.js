import React, { useState } from "react";

import "./App.css";

function App() {
    const ageBands =["영유아/아동", "10대", "20대", "30대", "40대", "50대", "60대", " 그 외"];

    const [selectsAgeBand, setSelectsAgeBand] = useState(ageBands[0]);
  return (
    <>
      <select onChange={(e) => setSelectsAgeBand(e.target.value)}>
        <option disabled selected>-나이대역-</option>
        {ageBands.map((ageBand) => <option selected={ageBand == selectsAgeBand} value={ageBand}>{ageBand}</option>)}
      </select>
      <hr />
      <div>현재 값: {selectsAgeBand}</div>
    </>
  );
}

export default App;
