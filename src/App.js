import React, {  useState,
  useMemo,
  useCallback } from "react";

import "./App.css";

function OrderMainFood({ setMainFoodCount, mainFoodCount }) {
  console.log(`OrderMainFood 실행됨`);

  return (
    <>
      <h2>메인 (수량 : {mainFoodCount})</h2>
      <div>
        <button onClick={() => setMainFoodCount(mainFoodCount + 1)}>
          증가
        </button>
        <button
          onClick={() =>
            setMainFoodCount(mainFoodCount == 1 ? 1 : mainFoodCount - 1)
          }
        >
          감소
        </button>
      </div>
    </>
  );
}

const MemoizedOrderMainFood = React.memo(OrderMainFood);

function OrderOptions({
  selectedCount,
  options,
  toggleAllChecked,
  btnAllChecked,
  optionCheckeds,
  toggleOptionCheck
}) {
  console.log(`OrderOptions 실행됨`);

  return (
    <>
      <h2>
        옵션 ({selectedCount} / {options.length})
      </h2>
      <label style={{ paddingLeft: 30, userSelect: "none" }}>
        <input type="checkbox" checked={btnAllChecked} onChange={toggleAllChecked}/>전체선택
      </label>
      <ul>
        {options.map((option, index) => (
          <li
            style={{ userSelect: "none", cursor: "pointer" }}
            key={option}
            
          >
            <label>
              <input type="checkbox" checked={optionCheckeds[index]} onChange={() => toggleOptionCheck(index)}/>{option}
            </label>
            
          </li>
        ))}
      </ul>
    </>
  );
}

const MemoizedOrderOptions = React.memo(OrderOptions);

  
  function OrderDelivery({deliveryType, setDeliveryType }) {
  console.log(`OrderDelivery 실행됨`);
  return(
    <>
    <h2>배달옵션</h2>
    <label>
      <input type="radio" name="delivery-type" checked={deliveryType == "직접수령"} onChange={() => setDeliveryType("직접수령")}/>직접수령
    </label>
    <label>
      <input type="radio" name="delivery-type" checked={deliveryType == "배달"} onChange={() => setDeliveryType("배달")}/>배달
    </label>
    </>
  )
}

const MemorizedOrderDelivery = React.memo(OrderDelivery);

function Order() {
  const [mainFoodCount, setMainFoodCount] = useState(1);

  const options = useMemo(() => [
    "콜라 1.5",
    "머스타드 소스",
    "홀스래디쉬 소스",
    "스윗어니언 소스",
    "마라 소스",
    "케찹 소스"
  ], []);

  const [optionCheckeds, setOptionCheckeds] = useState(
    new Array(options.length).fill(false)
  );

  const toggleOptionCheck = useCallback(
    (index) => {
      const newOptionCheckeds = optionCheckeds.map((el, _index) =>
        _index == index ? !el : el
      );
      setOptionCheckeds(newOptionCheckeds);
    },
    [optionCheckeds]
  );

  const btnAllChecked = useMemo(() => optionCheckeds.every((el) => el), [
    optionCheckeds
  ]);

  const selectedCount = useMemo(
    () => optionCheckeds.filter((el) => el).length,
    [optionCheckeds]
  );

  const [deliveryType, setDeliveryType] = useState("직접수령");

  const toggleAllChecked = useCallback(() => {
    if (btnAllChecked) {
      // 전부 체크해제 해야함
      const newOptionCheckeds = optionCheckeds.map((el) => false);
      setOptionCheckeds(newOptionCheckeds);
    } else {
      // 전부 체크 해야함
      const newOptionCheckeds = optionCheckeds.map((el) => true);
      setOptionCheckeds(newOptionCheckeds);
    }
  }, [optionCheckeds]);

  return (
    <>
      <h1>음식주문</h1>

      <MemoizedOrderMainFood
        setMainFoodCount={setMainFoodCount}
        mainFoodCount={mainFoodCount}
      />
      <MemoizedOrderOptions
        selectedCount={selectedCount}
        options={options}
        toggleAllChecked={toggleAllChecked}
        optionCheckeds={optionCheckeds}
        btnAllChecked={btnAllChecked}
        toggleOptionCheck={toggleOptionCheck}
      />
      <MemorizedOrderDelivery deliveryType={deliveryType} setDeliveryType={setDeliveryType} />
      
    </>
  );
}

function App() {
  return (
    <>
      <Order />
    </>
  );
}

export default App;
