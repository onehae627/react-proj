import React, { useState, useRef } from "react";

function RefEx() {
  const noInputRef = useRef(null);
  const [no, setNo] = useState("");

  const [recordedNos, setRecordedNos] = useState([5, 10, 15, 5, 20, 25, 5, 30]);

  const saveNo = () => {
    if (no === "") {
      alert("숫자를 입력해주세요.");
      return;
    }
    setRecordedNos([...recordedNos, no]);
    setNo("");
    noInputRef.current.focus();
  };
  const removeNo5 = () => {
    const newRecordedNo5 = recordedNos.filter((el) => el != 5);
    setRecordedNos(newRecordedNo5);
  };
  const removeNoFirst = () => {
    const newRecordedNo5 = recordedNos.filter((_, index) => index != 0);
    setRecordedNos(newRecordedNo5);
  };
  const removeNoLast = () => {
    const newRecordedNo5 = recordedNos.filter(
      (_, index) => index != recordedNos.length - 1
    );
    setRecordedNos(newRecordedNo5);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveNo();
        }}
      >
        <input
          type="number"
          ref={noInputRef}
          value={no}
          onChange={(e) => setNo(e.target.valueAsNumber)}
        />
        <button type="submit">기록</button>
      </form>

      <h1>기록된 숫자</h1>
      <ul>
        {recordedNos.map((el, index) => (
          <li key={index}>{el}</li>
        ))}
      </ul>

      <hr />
      <button onClick={removeNo5}> 숫자 5 삭제</button>
      <button onClick={removeNoFirst}>첫번째 숫자 삭제</button>
      <button onClick={removeNoLast}>마지막 숫자 삭제</button>
    </>
  );
}

export default RefEx;
