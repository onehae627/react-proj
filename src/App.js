import React,{useState, useRef, useEffect} from "react";
import {AppBar,Toolbar,Button,TextField, Chip }  from "@mui/material";
import "./App.css";
import classNames from "classnames";

function useTodosState() {
  const [todos, setTodos] = useState([]);
  const lastTodoIdRef = useRef(0);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;

    const newTodo = {
      id,
      content: newContent,
      regDate: dateToStr(new Date())
    };

    
    setTodos((todos) => [newTodo, ...todos]);
  };

  const modifyTodo = (index, newContent) => {
    const newTodos = todos.map((todo, _index) =>
      _index != index ? todo : { ...todo, content: newContent }
    );
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, _index) => _index != index);
    setTodos(newTodos);
  };

  return {
    todos,
    addTodo,
    modifyTodo,
    removeTodo
  };
}

const muiThemePaletteKeys = [
  "background",
  "common",
  "error",
  "grey",
  "info",
  "primary",
  "secondary",
  "success",
  "text",
  "warning",
];


function App({ theme }) {
  const todosState = useTodosState();

  useEffect(() => {
    todosState.addTodo("운동\n스트레칭\n유산소\n스쿼트\n자전거");
    todosState.addTodo("요리");
    todosState.addTodo("독서");
  },[]);

  useEffect(() => {
    const r = document.querySelector(':root');
    
    muiThemePaletteKeys.forEach((paletteKey) => {
      const themeColorObj = theme.palette[paletteKey];
      
      for ( const key in themeColorObj ) {
        if (Object.hasOwnProperty.call(themeColorObj, key)) {
          const colorVal = themeColorObj[key];
          r.style.setProperty(`--mui-color-${paletteKey}-${key}`, colorVal);
        }
      }
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("할일을 입력해주세요.");
      form.content.focus();

      return;
    }

    todosState.addTodo(form.content.value);
    form.content.value = "";
    form.content.focus();
  };
 
  return (
    <>
       <AppBar position="fixed">
        <Toolbar>
          <div className="flex-1"></div>
          <div className="font-bold">NOTEPAD</div>
          <div className="flex-1"></div>
        </Toolbar>
       </AppBar>
       <Toolbar />
       
       <form onSubmit={onSubmit} className="flex flex-col mt-4 px-4 gap-2">
        <TextField
          minRows={3}
          maxRows={10}
          multiline
          autoComplete="off"
          name="content"
          label="할일을 입력해주세요."
          variant="outlined"
        />
        <Button type="submit" variant="contained">추가</Button>
        </form>
      
      <div className="mt-4 px-4">
        <ul>
          {todosState.todos.map((todo, index) => (
            <li key={todo.id} className="mt-10">
              <div className="flex gap-2">
              <Chip label={`번호 : ${todo.id}`} variant="outlined" className="!pt-1"/>
              <Chip label={`번호 : {todo.regDate}`} variant="outlined" color="primary"className="!pt-1" />
                
              </div>
              <div className="flex shadow mt-4 rounded-[20px]">
                <Button className=" w-[130px] flex-shirik-0 !items-start !rounded-[20px_0_0_20px]" color="inherit">
                  <span className={classNames("text-3xl", "flex items-center","h-[50px]", {
                    "text-[color:var(--mui-color-primary-main)]": index % 2 == 0,
                  },{
                    "text-[#6fd189]": index % 2 != 0,
                  })}>
                    <i class="fa-sharp fa-solid fa-check"></i>
                  </span>
                </Button>
                <div className="flex-shirik-0 w-[2px] bg-[#6fd189] my-5 mr-6"></div>
                <div className=" flex-grow whitespace-pre-wrap leading-relaxed hover:text-[color:var(--mui-color-primary-main)] my-5 flex items-center">
                  {todo.content}      
                </div>
                <Button className=" w-[130px] flex-shirik-0 !items-start !rounded-[0_20px_20px_0]" color="inherit">
                  <span className="text-xl text-[#6fd189] flex items-center h-[50px]"><i class="fa-solid fa-ellipsis"></i></span>
                </Button>
              </div>

            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// 유틸리티

// 날짜 객체 입력받아서 문장(yyyy-mm-dd hh:mm:ss)으로 반환한다.
function dateToStr(d) {
  const pad = (n) => {
    return n < 10 ? "0" + n : n;
  };

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds())
  );
}

export default App;
