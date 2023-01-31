import React,{useState, useRef, useEffect, useMemo} from "react";
import {AppBar,Toolbar,Button,TextField, Chip, SwipeableDrawer, List, ListItem, ListItemButton, Modal, Snackbar, Alert as MuiAlert }  from "@mui/material";
import "./App.css";
import classNames from "classnames";

const Alert = React.forwardRef((props, ref) => {
  return (
    <MuiAlert {...props} ref={ref} variant="filled" />
  )
});

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

    return id;
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

  const removeTodoById = (id) => {
    const index = todos.findIndex((todo) => todo.id == id);
    return removeTodo(index);
  }

  const findTodoById = (id) => {
    const index = todos.findIndex((todo) => todo.id == id);
    if ( index == -1) {
      return null;
    }
    return todos[index];
  }

  const modifyTodoById = (id, newContent) => {
   const index = todos.findIndex((todo) => todo.id == id);

   if ( index == -1){
    return;
   }
   modifyTodo(index, newContent);
  }

  return {
    todos,
    addTodo,
    modifyTodo,
    removeTodo,
    removeTodoById,
    findTodoById,
    modifyTodoById,
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

function NewTodoForm({todosState, noticeSnackbarState}) {
  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("할 일을 입력해주세요.");
      form.content.focus();

      return;
    }

    const newTodoId = todosState.addTodo(form.content.value);
    form.content.value = "";
    form.content.focus();
    noticeSnackbarState.open(`${newTodoId}번 할 일이 추가되었습니다.`);
  };
  return(
    <>
     <form onSubmit={onSubmit} className="flex flex-col mt-4 px-4 gap-2">
        <TextField
          minRows={3}
          maxRows={10}
          multiline
          autoComplete="off"
          name="content"
          label="할 일을 입력해주세요."
          variant="outlined"
        />
        
        <Button type="submit" variant="contained">추가</Button>
        </form>
    </>
  )
}

function TodoListItem({todo, index, openDrawer}) {
  return(<>
   <li key={todo.id} className="mt-10">
      <div className="flex gap-2">
         <Chip label={`번호 : ${todo.id}`} variant="outlined" className="!pt-1"/>
         <Chip label={todo.regDate} variant="outlined" color="primary"className="!pt-1" />
                
       </div>
      <div className="flex shadow mt-4 rounded-[20px]">
         <Button className=" w-[130px] flex-shirik-0 !items-start !rounded-[20px_0_0_20px]" color="inherit">
                  <span className={classNames("text-3xl", "flex items-center","h-[50px]", {
                    "text-[color:var(--mui-color-primary-main)]": index % 2 == 0,
                  },{
                    "text-[#6fd189]": index % 2 != 0,
                  })}>
                    <i className="fa-sharp fa-solid fa-check"></i>
                  </span>
         </Button>
                <div className="flex-shirik-0 w-[2px] bg-[#6fd189] my-5 mr-6"></div>
                <div className=" flex-grow whitespace-pre-wrap leading-relaxed hover:text-[color:var(--mui-color-primary-main)] my-5 flex items-center">
                  {todo.content}      
                </div>
         <Button onClick={() => openDrawer(todo.id)} className=" w-[130px] flex-shirik-0 !items-start !rounded-[0_20px_20px_0]" color="inherit">
                  <span className="text-xl text-[#6fd189] flex items-center h-[50px]"><i className="fa-solid fa-ellipsis"></i></span>
         </Button>
       </div>

            </li>
  </>)
}


// Drawer 훅으로 만들기.
function useTodoOptionDrawerState() {
  const [todoId, setTodoId] = useState(null);
  const opened = useMemo(() => todoId !== null, [todoId]);
  const close = () => setTodoId(null);
  const open = (id) => setTodoId(id);
  
  return {
    todoId,
    opened,
    close,
    open
  };

    
}

function EditTodoModal({ state, todo, todosState, closeDrawer, noticeSnackbarState}) {
  const close = () => {
    state.close();
    closeDrawer();
  }
  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("할 일을 입력해주세요.");
      form.content.focus();

      return;
    }
    todosState.modifyTodoById(todo.id, form.content.value);
    close();
    noticeSnackbarState.open(`${todo.id}번 할 일이 수정되었습니다.`, "info");
  };
  return(
    <>
      <Modal
        open={state.opened}
        onClose={close}
        className="flex justify-center items-center"
      >
       <div className="bg-white p-10 rounded-[20px]">
        <form onSubmit={onSubmit} className="flex flex-col mt-4 px-4 gap-2">
        <TextField
          minRows={3}
          maxRows={10}
          multiline
          autoComplete="off"
          name="content"
          label="할 일을 입력해주세요."
          variant="outlined"
          defaultValue={todo?.content}
        />
        
        <Button type="submit" variant="contained">수정</Button>
        </form>
       </div>
      </Modal>
    </>
  )
}

function useEditTodoModalState() {
  const [opened, setOpened] = useState(false);

  const open = () => {
    setOpened(true)
  }
  const close = () => {
    setOpened(false)
  }
  return {
    opened,
    open,
    close
  }
}


function TodoOptionDrawer({state, todosState, noticeSnackbarState}) {
  const editTodoModalState = useEditTodoModalState(); 
  const removeTodo = () => {
    // 리액트에서는 window까지 붙여줘야함.
    if (window.confirm(`${state.todoId}번 할 일을 삭제하시겠습니까?`) == false){
      state.close();
      return;
    }
    // id맞는 애들을 찾아서 리턴해주겠다.(게시물번호)
    todosState.removeTodoById(state.todoId);
    state.close();
    noticeSnackbarState.open(`${todo.id}번 할 일이 삭제되었습니다.`, "info");
  }

  const todo = todosState.findTodoById(state.todoId);



  return (
    <>
    <EditTodoModal state={editTodoModalState} todo={todo} todosState={todosState} closeDrawer={state.close} noticeSnackbarState={noticeSnackbarState} />
      <SwipeableDrawer
        anchor={"bottom"}
        open={state.opened}
        onClose={state.close}
        >
        <List className="!py-0">
        <ListItem className="!pt-6 !p-5">
          <span className="text-[color:var(--mui-color-primary-main)] !pr-2">{state.todoId}번</span>옵션 드로어
        </ListItem>
        <ListItemButton className="!pt-6 !p-5 !items-baseline"  onClick={editTodoModalState.open}>
          <i className="fa-solid fa-pen"></i>        
          <span className="pl-2">수정</span>
        </ListItemButton>
        <ListItemButton className="!pt-6 !p-5 !items-baseline" onClick={removeTodo}>
          <i className="fa-solid fa-trash"></i>       
          <span className="pl-2">삭제</span>
          </ListItemButton>
        </List>
      </SwipeableDrawer>
   
    </>
  )
}


function TodoList({todosState, noticeSnackbarState }) {
  const todoOptionDrawerState = useTodoOptionDrawerState();
  
  return(<>
       <TodoOptionDrawer state={todoOptionDrawerState} todosState={todosState} noticeSnackbarState={noticeSnackbarState} />
       <div className="mt-4 px-4">
        <ul>
          {todosState.todos.map((todo, index) => (
           <TodoListItem key={todo.id} todo={todo} index={index} todosState={todosState}
           openDrawer={todoOptionDrawerState.open} noticeSnackbarState={noticeSnackbarState}
           />
          ))}
        </ul>
       </div>
  </>)
}

function useNoticeSnackbarState() {
  const [opened, setOpened] = useState(false);
  const [autoHideDuration, setAutoHideDuration] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [msg, setMsg] = useState(null);

  const open = (msg, severity = "success", autoHideDuration = 6000) => {
    setOpened(true);
    setAutoHideDuration(autoHideDuration);
    setSeverity(severity);
    setMsg(msg);

  }

  const close = () => {
    setOpened(false);
  }

  return {
    opened,
    autoHideDuration,
    severity,
    msg,
    open,
    close,
  }
}

// 스낵바 컴포넌트
function NoticeSnackbar({state}) {
  return(
  <>
    <Snackbar
        open={state.opened}
        autoHideDuration={state.autoHideDuration}
        onClose={state.close}>
        <Alert severity={state.severity}>{state.msg}</Alert>
    </Snackbar> 
  </>)
}

function App({ theme }) {
  const todosState = useTodosState();
  const noticeSnackbarState = useNoticeSnackbarState();

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
       <NoticeSnackbar state={noticeSnackbarState}/>
       <NewTodoForm todosState={todosState} noticeSnackbarState={noticeSnackbarState}/>
       <TodoList todosState={todosState} noticeSnackbarState={noticeSnackbarState} /> 
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
