import React,{ useState } from "react";
import { Button } from "@mui/material";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

//atom은 전역변수라고 생각하면 됨. 전역변수는 프로그램이 시작되고나서 끝까지 살아남음.
const page1NoAtom = atom({
    //키는 절대 겹쳐서는 안됨. 고유의 값이여야함.
    key : "RecoilEx/page1NoAtom",
    default : 0,
});

const page2NoAtom = atom({
    key : "RecoilEx/page2NoAtom",
    default : 0,
});


// useRecoilState은 useState랑 똑같은데 리코일에서 관리하는 스테이트라고 생각하면됨.
function Page1() {
    //지역변수는 함수가 끝나면 사라짐. 하루살이라고 보면 됨.
    const [no, setNo] = useRecoilState(page1NoAtom);
    //setState의 넘버를 바꾸는거기때문에 useSetRecoilState로 해줘야함. 세터까지 가져오기.
    const setPage2No = useSetRecoilState(page2NoAtom);
    // 버튼을 누르면 page2No가 초기화 됨.
    const onClick = () => setPage2No(0);

    return <>
    <h1>페이지 1</h1>
    <div>
    <Button onClick={onClick} variant="outlined">페이지2의 값을 초기화!</Button>
    </div>
    <ul>
        <li>페이지 1의 숫자 : {no}</li>
        <li>
        <Button onClick={() => setNo(no + 10)} variant="outlined">페이지 1의 10 증가</Button>
        <Button onClick={() => setNo(no - 10)} variant="outlined">페이지 1의 10 감소</Button>
        </li>
    </ul>
    </>
}

function Page2() {
    const [no, setNo] = useRecoilState(page2NoAtom);

    // 페이지 1의 단순 값{no}만 가져오겠다. 그럴땐 useRecoilValue사용.
    const page1No = useRecoilValue(page1NoAtom);
    return <>
    <h1>페이지 2</h1>

    <div>페이지 1의 숫자 :{page1No}</div>
    <ul>
        <li>페이지 2의 숫자 : {no}</li>
        <li>
        <Button onClick={() => setNo(no + 10)} variant="outlined">페이지 2의 10 증가</Button>
        <Button onClick={() => setNo(no - 10)} variant="outlined">페이지 2의 10 감소</Button>
        </li>
    </ul>
    </>
}

export default function RecoilEx() {
    const [pageName, setPageName] = useState("page1");
    const switchPage= () => setPageName(pageName == "page1" ? "page2" : "page1");
    return<>
    <Button onClick={switchPage} variant="outlined">스위치</Button>
    {pageName == "page1" && <Page1 />}
    {pageName == "page2" && <Page2 />}
    </>
}
