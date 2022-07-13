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
    const [state, refreshList] = useState(true);
    const todoList = [];
    let inputId = null;
    if (location.state != null) {
        inputId = location.state.inputId;
    }
    useEffect(() => {
        getToDoList();
        console.log(todoList);
    }, [state]);

    const getToDoList = async () => {
        const { data: result } = await axios.post(address + "gettodo", {
            inputId: { inputId },
        });
        for (let i = 0; i < result.length; i++) {
            console.log(result[i].TODO);
            todoList.push(
                <li key={i} className="main-listItem">
                    {result[i].TODO}
                </li>
            );
        }
    };

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
        getToDoList();
    };
    const addToDo = async () => {
        if (inputDate === null || inputToDo === null) {
            alert("내용이 없습니다.");
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
        getToDoList();
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
                <ul className="main-checkList">{todoList}</ul>
            </div>
            <div className="main-footer">
                <div className="main-plusButton" onClick={openWriter}>
                    +
                </div>
            </div>
        </div>
    );
}
