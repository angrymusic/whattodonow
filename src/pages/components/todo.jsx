import { useEffect, useState } from "react";
import "../style/todo.css";

export default function TODO({ todo, dday, korday, no, done, deletetodo, updatecheckbox, updatetodo }) {
    const [toggle, setToggle] = useState(false);
    const [updateToggle, setUpdateToggle] = useState(false);
    const [checked, setChecked] = useState(done);
    const [inputDate, setInputDate] = useState(null);
    const [inputToDo, setInputToDo] = useState(todo);
    const handleCheckBox = (e) => {
        setChecked(e.target.checked);
        updatecheckbox(no, !checked);
    };
    const handleInputDate = (e) => {
        setInputDate(e.target.value);
    };
    const handleInputToDo = (e) => {
        setInputToDo(e.target.value);
    };
    return (
        <div key={no} className="todo-listItem">
            <div className={toggle === true ? "todo-itemSummary-active" : "todo-itemSummary"}>
                <input type="checkbox" className="todo-checkBox" checked={checked} onChange={handleCheckBox} />
                <div
                    className="todo-textArea"
                    onClick={() => {
                        setToggle(!toggle);
                        if (updateToggle === true) {
                            setUpdateToggle(false);
                        }
                    }}
                >
                    <div className="todo-itemToDo">{todo}</div>
                    <div className="todo-itemDday">{dday}</div>
                    <div className="todo-itemKorDay">{korday}</div>
                </div>
            </div>
            <div className={updateToggle === true ? "todo-updateContainer-active" : "todo-updateContainer"}>
                <input className="todo-todoInputBox" onChange={handleInputToDo} placeholder={todo}></input>
                <input type="date" className="todo-dateInputBox" onChange={handleInputDate} />
            </div>
            <div className={toggle === true ? "todo-itemDetail-active" : "todo-itemDetail"}>
                <button
                    className="todo-button"
                    onClick={() => {
                        if (updateToggle) {
                            if (inputToDo === null || inputDate === null) {
                                alert("날짜와 할일을 입력하세요.");
                                return;
                            }
                            updatetodo(no, inputToDo, inputDate);
                        }
                        setUpdateToggle(!updateToggle);
                    }}
                >
                    수정
                </button>
                <button
                    className="todo-button"
                    onClick={() => {
                        console.log(no);
                        deletetodo(no);
                    }}
                >
                    삭제
                </button>
            </div>
        </div>
    );
}
