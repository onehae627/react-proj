import React, { useState } from "react";

function Popup() {
  const border = "10px solid red";
  const [popupVisible, setPopupVisible] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  
  return (
    <>
      <button className="btn btn-outline"
      onClick={() => setPopupVisible(false)}>
        팝업닫기
        </button>
        <button className="btn btn-outline"
      onClick={() => setPopupVisible(true)}>
        팝업닫기
        </button>
      <hr />
      {popupVisible && <div style={{ width: 100, height: 100, border }}></div>}
      {popupOpen || <div style={{ width: 100, height: 100, border }}></div>}
      

    </>
  );
  
}


  export default Popup;

