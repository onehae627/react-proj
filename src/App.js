import React,{useState, useRef, useEffect, useMemo} from "react";
import {AppBar,Toolbar,Button,TextField, Chip, SwipeableDrawer, List, ListItem, ListItemButton, Modal, Snackbar, Alert as MuiAlert }  from "@mui/material";
import "./App.css";
import classNames from "classnames";
import RecoilEx from "./RecoilEx";




import { atom, useRecoilState } from "recoil";

import { recoilPersist} from "recoil-persist";

const { persistAtom:persistAtomTodos } = recoilPersist({
  key : "persistAtomTodos"
});
const { persistAtom:persistAtomLastTodoId } = recoilPersist({
  key : "persistAtomLastTodoId"
});

const todosAtom = atom({
  key: "app/todosAtom",
  default: [{
    id: 3,
    regDate: "2023-02-02 12:12:12",
    content: "운동"
  },
  {
    id: 2,
    regDate: "2023-02-02 12:12:12",
    content: "책읽기"
  },
  {
    id: 1,
    regDate: "2023-02-02 12:12:12",
    content: "공부"
  }
],
  effects_UNSTABLE: [persistAtomTodos],
});

const lastTodoIdAtom = atom({
  key: "app/lastTodoIdAtom",
  default: 3,
  effects_UNSTABLE: [persistAtomLastTodoId],
});


const Alert = React.forwardRef((props, ref) => {
  return (
    <MuiAlert {...props} ref={ref} variant="filled" />
  )
});

function useTodosStatus() {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const [lastTodoId, setLastTodoId] = useRecoilState(lastTodoIdAtom);
  const lastTodoIdRef = useRef(lastTodoId);

  lastTodoIdRef.current = lastTodoId;

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;
    setLastTodoId(id);

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



function NewTodoForm() {
  const noticeSnackbarStatus = useNoticeSnackbarStatus();
  const todosStatus = useTodosStatus();
  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("할 일을 입력해주세요.");
      form.content.focus();

      return;
    }

    const newTodoId = todosStatus.addTodo(form.content.value);
    form.content.value = "";
    form.content.focus();
    noticeSnackbarStatus.open(`${newTodoId}번 할 일이 추가되었습니다.`);
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
function useTodoOptionDrawerStatus() {
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

function EditTodoModal({ status, todo, closeDrawer}) {
  const noticeSnackbarStatus = useNoticeSnackbarStatus();
  const todosStatus = useTodosStatus();
  const close = () => {
    status.close();
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
    todosStatus.modifyTodoById(todo.id, form.content.value);
    close();
    noticeSnackbarStatus.open(`${todo.id}번 할 일이 수정되었습니다.`, "info");
  };
  return(
    <>
      <Modal
        open={status.opened}
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

function useEditTodoModalStatus() {
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


function TodoOptionDrawer({status}) {
  const noticeSnackbarStatus = useNoticeSnackbarStatus();
  const todosStatus = useTodosStatus();

  const editTodoModalStatus = useEditTodoModalStatus(); 
  const removeTodo = () => {
    // 리액트에서는 window까지 붙여줘야함.
    if (window.confirm(`${status.todoId}번 할 일을 삭제하시겠습니까?`) == false){
      status.close();
      return;
    }
    // id맞는 애들을 찾아서 리턴해주겠다.(게시물번호)
    todosStatus.removeTodoById(status.todoId);
    status.close();
    noticeSnackbarStatus.open(`${todo.id}번 할 일이 삭제되었습니다.`, "info");
  }

  const todo = todosStatus.findTodoById(status.todoId);



  return (
    <>
    <EditTodoModal status={editTodoModalStatus} todo={todo} closeDrawer={status.close}  />
      <SwipeableDrawer
        anchor={"bottom"}
        onOpen={() => {}}
        open={status.opened}
        onClose={status.close}
        >
        <List className="!py-0">
        <ListItem className="!pt-6 !p-5">
          <span className="text-[color:var(--mui-color-primary-main)] !pr-2">{status.todoId}번</span>옵션 드로어
        </ListItem>
        <ListItemButton className="!pt-6 !p-5 !items-baseline"  onClick={editTodoModalStatus.open}>
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


function TodoList() {
  
  const todosStatus = useTodosStatus();
  const todoOptionDrawerStatus = useTodoOptionDrawerStatus();
  
  return(<>
       <TodoOptionDrawer status={todoOptionDrawerStatus} />
       <div className="mt-4 px-4">
        <ul>
          {todosStatus.todos.map((todo, index) => (
           <TodoListItem key={todo.id} todo={todo} index={index} 
           openDrawer={todoOptionDrawerStatus.open}
           />
          ))}
        </ul>
       </div>
  </>)
}

const noticeSnackbarInfoAtom = atom({
  key : "app/noticeSnackbarInfoAtom",
  default: {
    opened: false,
    autoHideDuration: 0,
    severity: "",
    msg:"",
  }
})

function useNoticeSnackbarStatus() {

  const [noticeSnackbarInfo, setNoticeSnackbarInfo] = useRecoilState(noticeSnackbarInfoAtom)

  const opened = noticeSnackbarInfo.opened ;
  const autoHideDuration = noticeSnackbarInfo.autoHideDuration ;
  const severity= noticeSnackbarInfo.severity;
  const msg = noticeSnackbarInfo.msg;


  const open = (msg, severity = "success", autoHideDuration = 6000) => {
    setNoticeSnackbarInfo({
      opened: true,
      autoHideDuration,
      severity,
      msg,
    });
  }

  const close = () => {
    setNoticeSnackbarInfo({
      ...noticeSnackbarInfo,
      opened: false,
    });
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
function NoticeSnackbar() {
  const status = useNoticeSnackbarStatus();
  return(
  <>
    <Snackbar
        open={status.opened}
        autoHideDuration={status.autoHideDuration}
        onClose={status.close}>
        <Alert severity={status.severity}>{status.msg}</Alert>
    </Snackbar> 
  </>)
}

function App({ theme }) {
  

  
 
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
       <NoticeSnackbar/>
       <NewTodoForm/>
       <TodoList /> 
       {/* <RecoilEx/> */}
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