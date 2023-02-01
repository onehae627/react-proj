import React,{ useState } from "react";
import { Button } from "@mui/material";
import { atom, atomFamily, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

//atomFamily는 말 그대로 여러개를 쓸 때 받아서 쓸 수 있다.
const pageNoAtomFamily = atomFamily({
    //키는 절대 겹쳐서는 안됨. 고유의 값이여야함.
    key : "RecoilEx/pageNoAtomFamily",
    default : (no) => 0,
});



// useRecoilState은 useState랑 똑같은데 리코일에서 관리하는 스테이트라고 생각하면됨.
function Page1() {
    //atomFamily는 말 그대로 여러개를 쓸 때 받아서 쓸 수 있다.
    const [no, setNo] = useRecoilState(pageNoAtomFamily(1));
   
    return <>
    <h1>페이지 1</h1>
    
    <ul>
        <li>페이지 1의 숫자 : {no}</li>
        <li>
        <Button onClick={() => setNo(no + 10)} variant="outlined">페이지 1의 10 증가</Button> 
        </li>
    </ul>
    </>
}

function Page2() {
    const [no, setNo] = useRecoilState(pageNoAtomFamily(2));

   
    return <>
    <h1>페이지 2</h1>

   
    <ul>
        <li>페이지 2의 숫자 : {no}</li>
        <li>
        <Button onClick={() => setNo(no + 10)} variant="outlined">페이지 2의 10 증가</Button>  
        </li>
    </ul>
    </>
}

function Page3() {
    const [no, setNo] = useRecoilState(pageNoAtomFamily(3));

    return <>
    <h1>페이지 3</h1>
    <ul>
        <li>페이지 3의 숫자 : {no}</li>
        <li>
        <Button onClick={() => setNo(no + 10)} variant="outlined">페이지 3의 10 증가</Button>
        </li>
    </ul>
    </>
}

function Page4() {
    const [no, setNo] = useRecoilState(pageNoAtomFamily(4));
 
    return <>
    <h1>페이지 4</h1>

    <ul>
        <li>페이지 4의 숫자 : {no}</li>
        <li>
        <Button onClick={() => setNo(no + 10)} variant="outlined">페이지 4의 10 증가</Button>   
        </li>
    </ul>
    </>
}

export default function RecoilEx() {
    const [pageNo, setPageNo] = useState(1);
    // 4 이상 가면 더 이상 페이지가 없으니까 다시 초기화.
    const switchPage= () => setPageNo(pageNo + 1 <= 4 ? pageNo + 1 : 1);

    const pageName = "page" + pageNo;
    return<>
    <Button onClick={switchPage} variant="outlined">스위치</Button>
    {pageName == "page1" && <Page1 />}
    {pageName == "page2" && <Page2 />}
    {pageName == "page3" && <Page3 />}
    {pageName == "page4" && <Page4 />}
    </>
}
