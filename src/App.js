import React, {  useState, useRef } from "react";

import "./App.css";


function App() {
  const [todos, setTodos] = useState([]);
  const lastTodoId = useRef(0);

  const addTodo = (newcontent) => {
    const id = lastTodoId.current++;
    const newTodo = {
      id,
      // 문장은 받아온걸로 넣겠다.
      content : newcontent,
      regDate: "2023-01-17 12 : 12 : 12"
    }
    // 지난번에 있던애들이랑 새로 추가된 애들까지 같이 추가됨.
    const newTodos = [...todos, newTodo ];
    setTodos(newTodos);
  }
  // 추가 버튼을 누르면addTodo실행됨. 
  const onBtnAddTofoClick = () => {
    addTodo("안녕");
  }
  return (
    <>
      <button onClick={onBtnAddTofoClick}>추가</button>
      <hr />
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.id}
            {todo.content}
            {todo.regDate}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
