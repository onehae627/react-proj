import React, { useState } from "react";
function NoRecord() {
  const [no, setNo] = useState(0);
  const [recordedNos, setRecordedNos] = useState([10, 20, 30]);
  const saveNo = () => {
    setRecordedNos([...recordedNos, no]);
  };

  const li = recordedNos.map((el, index) => <li key={index}>-{el}</li>);

  return (
    <>
      <h1>숫자기록</h1>
      <input
        type="number"
        value={no}
        onChange={(e) => setNo(e.target.valueAsNumber)}
        className="input w-full max-w-xs"
      />
      <button type="button" onClick={saveNo} className="btn btn-outline">
        기록
      </button>

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
