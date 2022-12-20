import React, { useState } from "react";
function NoRecord() {
  const [no, setNo] = useState("");
  const [recordedNos, setRecordedNos] = useState([10, 20, 30]);
  const saveNo = (e) => {
    e.preventDefault();
    // prevent 막는다.
    // Default 기본적인거
    // 링크를 클릭 했을 때 이동을 막는다.
    // 폼 전송시 폼이 발송되는 것을 막는다.
    // 마우스 휠 => 스크롤바 이동을 막는다.

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
      <form>
        <input
          type="number"
          value={no}
          onChange={(e) => setNo(e.target.valueAsNumber)}
          className="input w-full max-w-xs"
        />
        <button type="submit" onClick={saveNo} className="btn btn-outline">
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
