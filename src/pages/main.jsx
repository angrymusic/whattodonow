import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/main.css";
import { useLocation } from "react-router-dom";

const address = "http://localhost:8000/";

export default function Main() {
    const location = useLocation();
    const [writerMode, setWriterMode] = useState("closed");
    const [inputDate, setInputDate] = useState(null);
    const [inputToDo, setInputToDo] = useState(null);
    const [todoList, setToDoList] = useState(null);
    const [state, refreshList] = useState(true);
    let inputId = null;
    if (location.state != null) {
        inputId = location.state.inputId;
    }
    const getToDoList = async () => {
        let list = [];
        let Dday = "";
        let korDay = "";
        const today = new Date();
        let deadline;
        let diffOfDay;
        const weekday = ["일", "월", "화", "수", "목", "금", "토"];
        const sundayDate = 7 - today.getDay();
        let sunday = new Date();
        let nextSunday = new Date();
        let nextNextSunday = new Date();
        sunday.setHours(0,0,0,0);
        nextSunday.setHours(0,0,0,0);
        nextNextSunday.setHours(0,0,0,0);
        sunday.setDate(sunday.getDate() + sundayDate);
        nextSunday.setDate(sunday.getDate() + 7);
        nextNextSunday.setDate(nextSunday.getDate() + 7);


        console.log(sunday.toString());
        console.log(nextSunday.toString());
        console.log(nextNextSunday.toString());

        const { data: result } = await axios.post(address + "gettodo", {
            inputId: { inputId },
        });
        for (let i = 1; i < result.length; i++) {
            deadline = new Date(result[i].DEADLINE);
            deadline.setHours(0);
            diffOfDay = (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
            if ( 0 <= diffOfDay) {
                korDay = weekday[deadline.getDay()];
                if (today < deadline && deadline < sunday) {
                    korDay = "이번주 " + korDay;
                } else if (sunday <= deadline && deadline < nextSunday) {
                    korDay = "다음주 " + korDay;
                } else if (nextSunday <= deadline && deadline < nextNextSunday) {
                    korDay = "다다음주 " + korDay;
                }
            }
            else{
                korDay ="";
            }
            if (-1 <= diffOfDay && diffOfDay < 0) {
                Dday = "D-day";
            } else if (0 <= diffOfDay && diffOfDay < 1) {
                Dday = "D-1";
            } else if (diffOfDay < -1) {
                Dday = "D+" + (parseInt(diffOfDay) * -1 + 1);
            } else {
                Dday = "D-" + (parseInt(diffOfDay) + 1);
            }
            list.push(
                <li key={i} className="main-listItem">
                    <div className="main-itemSummary">
                        <input type="checkbox" />
                        {/* 체크박스 */}
                        <div className="main-itemToDo">
                            {result[i].TODO}
                            {/* 내용 */}
                        </div>
                        <div className="main-itemDday">{Dday}</div>
                        <div className="main-itemKorDay">{korDay}</div>
                    </div>
                    <div className="main-itemDetail"></div>
                </li>
            );
        }
        setToDoList(list);
        if (result.length == 1) {
            refreshList(!state);
        }
    };
    useEffect(() => {
        getToDoList();
    }, [state]);

    const handleInputDate = (e) => {
        setInputDate(e.target.value);
    };
    const handleInputToDo = (e) => {
        setInputToDo(e.target.value);
    };
    const openWriter = () => {
        setWriterMode("opened");
    };
    const closeWriter = () => {
        setWriterMode("closed");
    };
    const addToDo = async () => {
        if (inputToDo === null) {
            alert("내용이 없습니다.");
            return;
        }
        else if(inputDate === null){
            alert("날짜를 입력해주세요.");
            return;
        }
        else if(inputToDo.length>40){
            alert("최대 40글자입니다.");
            return;
        }
        setWriterMode("closed");
        const { data: result } = await axios.post(address + "addtodo", {
            inputId: { inputId },
            inputDate: { inputDate },
            inputToDo: { inputToDo },
        });
        console.log(result);
        if (result) {
            //로그인 성공! 화면이동
            console.log("add success");
        } else {
            console.log("add fail");
        }
        refreshList(!state);
    };

    return (
        <div className="main-backGround">
            <div className={writerMode === "closed" ? "closedWriter" : "openedWriter"}>
                <div className="main-writerContainer">
                    <div className="main-writerHeader"></div>
                    <div className="main-writer">
                        <div className="main-writePage">
                            <div>
                                <span className="main-title">날짜</span>
                                <input className="main-dateInputBox" type="date" onChange={handleInputDate} />
                            </div>
                            <div className="main-title">할 일</div>
                            <textarea className="main-todoInputBox" onChange={handleInputToDo} placeholder="최대 40글자입니다."/>
                        </div>
                    </div>
                    <div className="main-writerFooter">
                        <div className="main-quitButton" onClick={closeWriter}>
                            +
                        </div>
                        <div className="main-plusButton" onClick={addToDo}>
                            +
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-header">What To Do Now?</div>
            <div className="main-container">
                <ul className="main-checkList">{todoList}</ul>
            </div>
            <div className="main-footer">
                <div className="main-writerOpener" onClick={openWriter}>
                    +
                </div>
            </div>
        </div>
    );
}
