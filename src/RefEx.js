import React, { useState, useRef } from "react";

function RefEx() {
  const noInputRef = useRef(null);
  const [no, setNo] = useState("");

  const [recordedNos, setRecordedNos] = useState([
    5, 10, 15, 5, 20, 25, 5, 30, 35, 40, 45, 50,
  ]);

  const saveNo = () => {
    if (no === "") {
      alert("숫자를 입력해주세요.");
      return;
    }
    setRecordedNos([...recordedNos, no]);
    setNo("");
    noInputRef.current.focus();
  };
  const removeNo = (index) => {
    const newRecordedNo5 = recordedNos.filter((el, _index) => _index != index);
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
      <button onClick={() => removeNo(0)}> index 0 삭제</button>
      <button onClick={() => removeNo(3)}> index 3 삭제</button>
      <button onClick={() => removeNo(5)}> index 5 삭제</button>
      <button onClick={() => removeNo(7)}> index 7 삭제</button>
    </>
  );
}

export default RefEx;
