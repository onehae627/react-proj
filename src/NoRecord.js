import React, { useState } from "react";
function NoRecord() {
  const [no, setNo] = useState("");
  const [recordedNos, setRecordedNos] = useState([10, 20, 30]);
  const saveNo = (e) => {
    if (no === "") {
      alert("숫자를 입력해주세요.");
      return;
    }
    setRecordedNos([...recordedNos, no]);
    setNo("");
  };

  const li = recordedNos.map((el, index) => <li key={index}>-{el}</li>);

  return (
    <>
      <h1>숫자기록</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveNo();
        }}
      >
        <input
          type="number"
          value={no}
          onChange={(e) => setNo(e.target.valueAsNumber)}
          className="input w-full max-w-xs"
        />
        <button type="submit" className="btn btn-outline">
          기록
        </button>
      </form>

      <hr />

      <h1>기록된 숫자v1 : [{recordedNos.join(",")}]</h1>

      <hr />

      <h1>
        기록된 숫자v2 : <ul>{li}</ul>
      </h1>
      <hr />

      <h1>
        기록된 숫자v2-1
        <ul>
          {recordedNos.map((el, index) => (
            <li key={index}>-{el}</li>
          ))}
        </ul>
      </h1>
    </>
  );
}

export default NoRecord;
