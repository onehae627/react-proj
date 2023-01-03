import React, { useState } from "react";

import "./App.css";

function Order() {
  const options = [
    "콜라 1.5",
    "머스타드 소스",
    "홀스래디쉬 소스",
    "스윗어니언 소스",
    "마라 소스",
  ];

  const [optionCheckeds, setOptionCheckeds] = useState([
    false,
    false,
    true,
    true,
    true,
  ]);

  const toggleOptionCheck = (index) => {
    const newOptionCheckeds = optionCheckeds.map((el, _index) =>
      _index === index ? !el : el
    );
    setOptionCheckeds(newOptionCheckeds);
  };

  // optionCheckeds가 모두가 참일 때 전체선택 됨
  const btnAllChecked = optionCheckeds.every((el) => el);

  const toggleAllChecked = () => {
    if (btnAllChecked) {
      // 전부 체크해제
      const newOptionCheckeds = optionCheckeds.map((el) => false);
      setOptionCheckeds(newOptionCheckeds);
    } else {
      // 전부 체크
      const newOptionCheckeds = optionCheckeds.map((el) => true);
      setOptionCheckeds(newOptionCheckeds);
    }
  };
  return (
    <>
      <h1>음식주문</h1>
      <h2>옵션</h2>
      <span
        onClick={toggleAllChecked}
        style={{ paddingLeft: 30, userSelect: "none" }}
      >
        {btnAllChecked ? "[v]" : "[ ]"}전체선택
      </span>

      <ul>
        {options.map((option, index) => (
          <li
            key={option}
            style={{ userSelect: "none", cursor: "pointer" }}
            onClick={() => toggleOptionCheck(index)}
          >
            {optionCheckeds[index] ? "[v]" : "[ ]"}
            {option}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Order;
