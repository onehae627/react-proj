import StopWatch from "./StopWatch";
import NumberCounter from "./NumberCounter";
import Popup from "./Popup";
function App() {
  return (
    <>
      {/* <StopWatch /> */}
      {/* <NumberCounter /> */}
      {/* <Popup /> */}
      <div style={{display: "flex", gap: "10px"}}>
     <div style={{display: "inline-flex" ,flexDirection: "column", gap : "10px"}}>
      <img src="https://picsum.photos/id/1/400/400"/>
      <div style={{textAlign: "center" ,fontWeight:"bold", color: "#454545"}}>MAC BOOK</div>
      <div style={{textAlign: "center"}}>4,340,000</div>
     </div>
     <div style={{display: "inline-flex" ,flexDirection: "column", gap : "10px"}}>
      <img src="https://picsum.photos/id/2/400/400"/>
      <div style={{textAlign: "center",fontWeight:"bold", color: "#454545"}}>MAC BOOK PRO</div>
      <div style={{textAlign: "center"}}>4,340,000</div>
     </div>
     <div style={{display: "inline-flex" ,flexDirection: "column", gap : "10px"}}>
      <img src="https://picsum.photos/id/3/400/400"/>
      <div style={{textAlign: "center",fontWeight:"bold", color: "#454545"}}>MAC BOOK PRO MAX</div>
      <div style={{textAlign: "center"}}>4,340,000</div>
     </div>
     </div>

    </>
  );
}

export default App;
