import React,{ useState } from "react";
import {Button} from "@mui/material";
import {Routes, Route, Navigate, useLocation, NavLink, useParams, useNavigate} from "react-router-dom";
import classNames from "classnames";
function HomeMainPage() {
    return(
        <>
        <h1>HOME, MAIN</h1>
        </>
    )
}

function HomeAboutPage() {
    return(
        <>
        <h1>HOME, ABOUT</h1>
        </>
    )
}

function UserLoginPage() {
    return(
        <>
        <h1>User Login</h1>
        </>
    )
}


function ArticleListPage() {
    const articles = [
        { id: 1 }, { id: 2 }
    ];
    return <>
    <h1>ARTICLE LIST</h1>
    <ul>
       {articles.map((article) => (
        <li key={article.id}>
            <NavLink to={`/article/detail/${article.id}`}>{article.id}번 게시물</NavLink>
        </li>
       ))}
    </ul>
    </>
}


function  ArticleDetailPage() {
    const navigate = useNavigate();
    const {id} = useParams();

    return<>
    <h1>ARTICLE DETAIL</h1>
    <h2>{id}번 게시물 상세 페이지</h2>
    <Button variant="outlined" onClick={() => navigate(-1)}>뒤로가기</Button>
    </>
}


export default function RouterEx() {
    const location = useLocation();
    // /

    return(
        <>
        <header>
            현재 주소 : {location.pathname}
            <hr/>
            <div className="flex gap-2">
                <NavLink to="/home/main" className={({ isActive }) => classNames("btn", {"btn-link" : !isActive}, {"btn-primary" : isActive})}>MAIN</NavLink>
                <NavLink to="/home/about" className={({ isActive }) => classNames("btn", {"btn-link" : !isActive}, {"btn-primary" : isActive})}>ABOUT</NavLink>
                <NavLink to="/user/login" className={({ isActive }) => classNames("btn", {"btn-link" : !isActive}, {"btn-primary" : isActive})}>LOGIN</NavLink>
                <NavLink to="/article/list" className={({ isActive }) => classNames("btn", {"btn-link" : !isActive}, {"btn-primary" : isActive})}>ArticleList</NavLink>
            </div>
        </header>
        <Routes>
            <Route path = "/home/main" element={<HomeMainPage/>}/>
            <Route path = "/home/about" element={<HomeAboutPage/>}/>
            <Route path = "/user/login" element={<UserLoginPage/>}/>
            <Route path = "/article/list" element={<ArticleListPage/>}/>
            <Route path = "/article/detail/:id" element={<ArticleDetailPage/>}/>
            <Route path = "*" element={<Navigate to="/home/main"/>}/>
        </Routes>
        </>
    )
}