import React, { useState } from "react";

import "./App.css";

function App() {
    const [selectsGender, setSelectsGender] = useState('W');
  return (
    <>
      <label>
        <input type="radio" name="gender" onChange={(e) => setSelectsGender('M')} checked={selectsGender == "M"}/>남성
        <input type="radio" name="gender" onChange={(e) => setSelectsGender('W')} checked={selectsGender == "W"}/>여성
      </label>
      <hr />
      <div>현재 값: {selectsGender}</div>
      </>
  );
}

export default App;
