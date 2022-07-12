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
    const inputId = location.state.ID;

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
        if (inputDate === null || inputToDo === null) {
            alert("내용이 없습니다.");
            //빈칸알림
            return;
        }
        setWriterMode("closed");
        console.log(inputDate);
        const { data: result } = await axios.post(address + "addtodo", {
            inputId: { inputId },
            inputDate: { inputDate },
            inputToDo: { inputToDo },
        });
        console.log(result);
        if (result) {
            //로그인 성공! 화면이동
            console.log("login success");
        } else {
            console.log("login fail");
        }
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
                            <textarea className="main-todoInputBox" onChange={handleInputToDo} />
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
                <div className="main-checkList"></div>
            </div>
            <div className="main-footer">
                <div className="main-plusButton" onClick={openWriter}>
                    +
                </div>
            </div>
        </div>
    );
}
